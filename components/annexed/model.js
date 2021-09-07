const { mongoDB } = require('../../db');

const annexedSchema = mongoDB.mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    Key: {
        type: String,
    }
});

module.exports = mongoDB.mongoose.model('Annexed', annexedSchema);