const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    annexed: [{
        location: {
            type: String,
            required: true
        },
        Key: {
            type: String,
        }
    }]
});

module.exports = mongoose.model('Patient', patientSchema);