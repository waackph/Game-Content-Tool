const mongoose = require('mongoose');
const ItemSchema = require('./Item')
const CharacterSchema = require('./Character')
const SequenceSchema = require('./Sequence')

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    room_width: {
        type: Number,
        required: true,
    },
    texture_path: {
        type: String,
        required: true,
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
});

module.exports = Room = mongoose.model('room', RoomSchema);