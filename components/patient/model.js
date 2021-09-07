const { mongoDB } = require('../../db');

const patientSchema = mongoDB.mongoose.Schema({
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

module.exports = mongoDB.mongoose.model('Patient', patientSchema);