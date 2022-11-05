const mongoose = require('mongoose');

const CommandSchema = new mongoose.Schema({
    CommandType: {
        type: String,
        required: true,
    },
    // Walk
    DestinationX: {
        type: Number,
        required: false,
    },
    DestinationY: {
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