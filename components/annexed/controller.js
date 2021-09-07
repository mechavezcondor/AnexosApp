const AWS = require('aws-sdk');
let mime = require('mime-types');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const { updatePatient, getPatientId } = require('../../components/patient/controller');
const { add, get, remove } = require("./store");

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION
});

const getAnnexedId = async (id) => {
    if (!id) {
        throw '[patientController] incorrect id';
    }
    return await get(id);
};

const createAnnexed = async (idPatient, event) => {
    try {
        const foundPatient = await getPatientId(idPatient);
        if (!foundPatient) {
            throw 'Patient notFound';
        }
        let fileContent = event.isBase64Encoded ? Buffer.from(event.body, 'base64') : event.body;
        let contentType = event.headers['content-type'] || event.headers['Content-Type'];
        let fileName = uuidv4();
        let extension = mime.extension(contentType);

        let fullFileName = `${fileName}.${extension}`;

        const folder = 'Anexos/' + fullFileName;

        let s3Params = {
            Bucket: process.env.BUCKET,
            Key: folder,
            Body: fileContent,
            Metadata: {},
            ACL: 'public-read'
        };
        const data = await s3.upload(s3Params).promise();
        return await updateBdAnnnexed(idPatient, data);
    } catch (error) {
        throw error
    }
};

const removeAnnexed = async (idAnnexed, Key, idPatient) => {
    try {
        const foundPatient = await getPatientId(idPatient);
        const foundAnnexed = await getAnnexedId(idAnnexed);

        if (!foundPatient) {
            throw 'Patient notFound';
        }

        if (!foundAnnexed) {
            throw 'Annexed notFound';
        }

        if (!Key) {
            throw 'Key is required';
        }

        var params = {
            Bucket: process.env.BUCKET,
            Key
        };

        let delAnnexed = true;
        // Borrar objetos de un buckets
        const data = await s3.deleteObject(params).promise();
        return await updateBdAnnnexed(idPatient, data, idAnnexed, delAnnexed);
    } catch (error) {
        throw error;
    }
};

const updateBdAnnnexed = async (idPatient, data, idAnnexed = '', delAnnexed = false) => {
    const { Location, Key } = data;
    fullAnnexed = {
        location: Location,
        Key
    };

    if (delAnnexed === true) {
        const annexed = await remove(idAnnexed);
        if (annexed) {
            return await updatePatient(idPatient, annexed, delAnnexed);
        }
    }

    const annexed = await add(fullAnnexed);
    return await updatePatient(idPatient, annexed);
}

module.exports = {
    createAnnexed,
    removeAnnexed
}