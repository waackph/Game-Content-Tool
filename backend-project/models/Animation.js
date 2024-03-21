const mongoose = require('mongoose');

// ***
// The data base schema of an animation object
// ***

const AnimationSchema = new mongoose.Schema({
    $type: {
        type: String,
        required: true,
    },
}, { strict: false });

module.exports = AnimationSchema;