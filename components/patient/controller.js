const { add, list, get, update, remove } = require("./store");

const listPatient = () => {
    return new Promise((res, rej) => {
        const result = list();
        res(result);
    });
}

const getPatientId = (id) => {
    return new Promise((res, rej) => {
        if (!id) {
            return rej('[patientController] incorrect id');
        }
        const result = get(id);
        res(result);
    });
}

const createPatient = (name, lastName, age) => {
    return new Promise((res, rej) => {
        if (!name, !lastName) {
            return rej('[patientController] incorrect name or lastName');
        }

        const fullPatient = {
            name,
            lastName,
            age
        };
        const result = add(fullPatient);
        res(result);
    });
}

const updatePatient = (id, annexed, delAnnexed) => {
    return new Promise(async (res, rej) => {
        if (!id || !annexed) {
            return rej('[PatientController] incorrect id or annexed');
        }
        const result = await update(id, annexed, delAnnexed)
        res(result);
    });
}

const removeAnnexed = (id) => {
    return new Promise(async (res, rej) => {
        if (!id) {
            return rej('[PatientController] incorrect id');
        }
        const result = await remove(id)
        res(result);
    });
}

module.exports = {
    listPatient,
    createPatient,
    getPatientId,
    updatePatient,
    removeAnnexed
}