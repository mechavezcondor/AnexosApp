const Model = require('./model');

const addAnnexed = async (annexed) => {
    const myAnnexed = new Model(annexed);
    return await myAnnexed.save();
};

const removeAnnexed = async (id) => {
    return await Model.findByIdAndDelete(id);
}

module.exports = {
    add: addAnnexed,
    remove: removeAnnexed
};