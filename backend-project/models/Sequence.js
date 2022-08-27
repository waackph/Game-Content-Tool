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
    _currentIndex: {
        type: Number,
        required: true,
    },
    _commands: {
        type: [CommandSchema],
        required: true,
    },
    SequenceFinished: {
        type: Boolean,
        required: true,
    },
});

module.exports = SequenceSchema;