const mongoose = require('mongoose');

const DialogEdgeSchema = new mongoose.Schema({
    _nextNodeId: {
        type: String,  // Is Object ID
        required: true,
    },
    _dialogLine: {
        type: String,
        required: true,
    },
    MoodDependence: {
        type: Number,
        required: true,
    }
});

const DialogNodeSchema = new mongoose.Schema({
    _dialogLine: {
        type: String,
        required: true,
    },
    _edges: {
        type: [DialogEdgeSchema],
        required: true,
    }
});

module.exports = DialogNodeSchema;