const mongoose = require('mongoose');

// ***
// The data base schema of a Sequence object. It contains the Sequence and its Command schemas.
// ***

const CommandSchema = new mongoose.Schema({
    CommandType: {
        type: String,
        required: true,
    },
    ThingId: {
        type: Number,
        required: false,
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
    },
    // Animation & ChangeRoom
    StartPositionX: {
        type: Number,
        required: false,
    },
    StartPositionY: {
        type: Number,
        required: false,
    },
    AnimState: {
        type: String,
        required: false,
    },
    // Animation
    ScaleSize: {
        type: Number,
        required: false,
    },
    // ChangeRoom
    NextRoomId: {
        type: Number,
        required: false,
    },
    ThoughtText: {
        type: String,
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