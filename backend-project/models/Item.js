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

module.exports = Item = mongoose.model('item', ItemSchema);