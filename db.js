const settings = require('./utils/settings');
const mongoDB = require("@condor-labs/mongodb")(settings.mongo);

const connect = () => {
    mongoDB.getClient()
        .then(() => console.log('connected @condor/mongo'))
        .catch(() => console.log('not connectec'));
};

module.exports = {
    mongoDB,
    connect
};