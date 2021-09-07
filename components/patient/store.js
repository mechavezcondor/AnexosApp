const Model = require('./model');

const getPatients = async () => {
    return await Model.find();
};

const getPatient = async (id) => {
    return await Model.findById(id);
};

const addPatient = async (patient) => {
    const myPatient = new Model(patient);
    return await myPatient.save();
};

const updatePatient = async (id, annexed, delAnnexed = false) => {
    try {
        const foundPatient = await Model.findById(id);

        if (delAnnexed) {
            return await Model.updateOne({ _id: id }, { $pull: { annexed: { _id: annexed._id } } });
        }

        foundPatient.annexed.push(annexed);
        const response = await foundPatient.save();
        return response;
    } catch (error) {
        throw error;
    }
};

const removeAnnexed = async (id) => {
    return await Model.findByIdAndDelete(id);
};

module.exports = {
    add: addPatient,
    list: getPatients,
    get: getPatient,
    update: updatePatient,
    remove: removeAnnexed
};