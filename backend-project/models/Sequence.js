const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
    CommandType: {
        type: String,
        required: true,
    },
    // Walk
    _destinationX: {
        type: Number,
        required: false,
    },
    _destinationY: {
        type: Number,
        required: false,
    },
    // Wait
    MillisecondsToWait: {
        type: Number,
        required: false,
    },
    CmdSoundFilePath: {
        type: String,
        required: false,
    },
    // DoorAction
    DoorId: {
        type: Number,
        required: false,
    }
});

const SequenceSchema = new mongoose.Schema({
    Commands: {
        type: [CommandSchema],
        required: true,
    },
});

module.exports = SequenceSchema;