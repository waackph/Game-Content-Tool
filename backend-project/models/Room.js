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
    SoundFilePath: {
        type: String,
        required: false,
    },
    LightMapPath: {
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
}, { strict: false });

module.exports = Room = mongoose.model('room', RoomSchema);