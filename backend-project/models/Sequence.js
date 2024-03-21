const mongoose = require('mongoose');

// ***
// The data base schema of a Sequence object. It contains the Sequence and its Command schemas.
// ***

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
}, { strict: false });

const SequenceSchema = new mongoose.Schema({
    Commands: {
        type: [CommandSchema],
        required: true,
    },
}, { strict: false });

module.exports = SequenceSchema;