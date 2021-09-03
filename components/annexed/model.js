const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const annexedSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    Key: {
        type: String,
    }
});

module.exports = mongoose.model('Annexed', annexedSchema);