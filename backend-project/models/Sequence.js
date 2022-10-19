const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
    CommandType: {
        type: String,
        required: true,
    },
    _destinationX: {
        type: Number,
        required: false,
    },
    _destinationY: {
        type: Number,
        required: false,
    },
    CommandFinished: {
        type: Boolean,
        required: true,
    },
});

const SequenceSchema = new mongoose.Schema({
    Commands: {
        type: [CommandSchema],
        required: true,
    },
});

module.exports = SequenceSchema;