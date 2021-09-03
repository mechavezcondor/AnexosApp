const Model = require('./model');

const getPatients = () => {
    return new Promise((res, rej) => {
        res(Model.find());
    });
};

const getPatient = (id) => {
    return new Promise((res, rej) => {
        res(Model.findById(id));
    });
};

const addPatient = async (patient) => {
    const myPatient = new Model(patient);
    return await myPatient.save();
};

const updatePatient = async (id, annexed, delAnnexed = false) => {
    const foundPatient = await Model.findById(id);
    if (delAnnexed) {
        return await Model.updateOne({ _id: id }, { $pull: { annexed: { _id: annexed._id } } });
    }

    if (foundPatient) {
        foundPatient.annexed.push(annexed);
        return await foundPatient.save();
    }
    return 'Patient notFound';
}

const removeAnnexed = async (id) => {
    return await Model.findByIdAndDelete(id);
}

module.exports = {
    add: addPatient,
    list: getPatients,
    get: getPatient,
    update: updatePatient,
    remove: removeAnnexed
};