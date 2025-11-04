const mongoose = require('mongoose');
const ItemSchema = require('./Item');
const CharacterSchema = require('./Character');
const SequenceSchema = require('./Sequence');
const ThoughtNodeSchema = require('./Thought');

// ***
// The data base schema of a Room object
// ***

const RoomSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    RoomWidth: {
        type: Number,
        required: true,
    },
    texturePath: {
        type: String,
        required: true,
    },
    xLimStart: {
        type: Number,
        required: false,
    },
    xLimEnd: {
        type: Number,
        required: false,
    },
    yLimStart: {
        type: Number,
        required: false,
    },
    yLimEnd: {
        type: Number,
        required: false,
    },
    SoundFilePath: {
        type: String,
        required: false,
    },
    LightMapPath: {
        type: String,
        required: false,
    },
    WalkingSoundFilePath: {
        type: String,
        required: false,
    },
    AtmoSoundFilePath: {
        type: String,
        required: false,
    },
    EntrySequence: {
        type: SequenceSchema,
        required: false,
    },
    Items: {
        type: [ItemSchema],
        required: false,
    },
    Characters: {
        type: [CharacterSchema],
        required: false,
    },
    // Thought data structure
    Thought: {
        type: ThoughtNodeSchema,
        required: false,
    },
    PlayerScale: {
        type: Number,
        required: false,
    },
}, { strict: false });

module.exports = Room = mongoose.model('room', RoomSchema);