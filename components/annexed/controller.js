const AWS = require('aws-sdk');
let mime = require('mime-types');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const { updatePatient } = require('../../components/patient/controller');
const { add, remove } = require("./store");

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION
});

const createAnnexed = (idPatient, event) => {
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

    s3.upload(s3Params, async (error, data) => {
        if (error) {
            return error;
        }
        const { Location, Key } = await data;
        const fullAnnexed = {
            location: Location,
            Key
        };
        const annexed = await add(fullAnnexed);
        const response = await updatePatient(idPatient, annexed);
        return response;
    });
}

const removeAnnexed = (idAnnexed, Key, idPatient) => {
    var params = {
        Bucket: process.env.BUCKET,
        Key
    };

    // Borrar objetos de un buckets
    s3.deleteObject(params, async (error, data) => {
        if (error) {
            return error;
        } else {
            const delAnnexed = true;
            await data;
            const annexed = await remove(idAnnexed);

            const resData = await updatePatient(idPatient, annexed, delAnnexed);
            return resData;
        }
    });
}

module.exports = {
    createAnnexed,
    removeAnnexed
}