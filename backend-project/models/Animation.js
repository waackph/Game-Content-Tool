const mongoose = require('mongoose');

const AnimationSchema = new mongoose.Schema({
    $type: {
        type: String,
        required: true,
    },
});

module.exports = AnimationSchema;