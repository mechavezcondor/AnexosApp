require('dotenv').config();
module.exports = {
    mongo: {
        host: process.env.MONGOHOST,
        port: process.env.MONGOPORT,
        database: process.env.MONGODATABASE,
        user: process.env.MONGOUSER,
        password: process.env.MONGOPASSWORD,
        replicaSet: process.env.MONGOREPLICASET,
        ssl: process.env.MONGOSSL,
        authSource: process.env.MONGOAUTHSOURCE
    }
};