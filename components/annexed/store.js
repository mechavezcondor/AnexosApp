const Model = require('./model');

const getAnnexedId = async (id) => {
    return await Model.findById(id);
};

const addAnnexed = async (annexed) => {
    const myAnnexed = new Model(annexed);
    return await myAnnexed.save();
};

const removeAnnexed = async (id) => {
    return await Model.findByIdAndDelete(id);
};

module.exports = {
    get: getAnnexedId,
    add: addAnnexed,
    remove: removeAnnexed
};