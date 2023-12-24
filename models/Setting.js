const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Unique username
    },
    value: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Setting', settingSchema);