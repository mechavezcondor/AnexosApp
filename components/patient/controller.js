const { add, list, get, update, remove } = require("./store");

const listPatient = async () => {
    const res = await list();
    if (!res) {
        throw 'List Patients not Found';
    }
    return res;
};

const getPatientId = async (id) => {
    if (!id) {
        throw '[patientController] incorrect id';
    }
    const res = await get(id);
    if (!res) {
        throw 'Patient not Found';
    }
    return res;
};

const createPatient = async (name, lastName, age) => {
    if (!name, !lastName) {
        throw '[patientController] Name or lastName is required';
    }

    const fullPatient = {
        name,
        lastName,
        age
    };

    return await add(fullPatient);
};

const updatePatient = async (id, annexed, delAnnexed) => {
    if (!id || !annexed) {
        throw '[PatientController] incorrect id or annexed';
    }
    const response = await update(id, annexed, delAnnexed);
    return response
}

const removeAnnexed = async (id) => {
    if (!id) {
        throw '[PatientController] incorrect id';
    }
    return await remove(id);
};

module.exports = {
    listPatient,
    createPatient,
    getPatientId,
    updatePatient,
    removeAnnexed
};