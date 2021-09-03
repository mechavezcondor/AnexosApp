const db = require('mongoose');

db.Promise = global.Promise;

const connect = async (url) => {
    try {
        await db.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB is connected!!');
    } catch (error) {
        console.log(`DB error ${error}`);
    }
}

module.exports = connect;