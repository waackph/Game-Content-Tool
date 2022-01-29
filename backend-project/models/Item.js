const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    texture_path: {
        type: String,
        required: false,
    }
});

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
    items: {
        type: [ItemSchema],
        required: false,
    }
});

module.exports = Room = mongoose.model('room', RoomSchema);
// module.exports = Item = mongoose.model('item', ItemSchema);