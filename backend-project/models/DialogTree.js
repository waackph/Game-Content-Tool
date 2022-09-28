const mongoose = require('mongoose');

const DialogEdgeSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
    },
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
    },
    x: {
        type: Number,
        required: false,
    },
    y: {
        type: Number,
        required: false,
    },
});

const DialogNodeSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
    },
    _dialogLine: {
        type: String,
        required: true,
    },
    _edges: {
        type: [DialogEdgeSchema],
        required: true,
    },
    x: {
        type: Number,
        required: false,
    },
    y: {
        type: Number,
        required: false,
    },
});

module.exports = DialogNodeSchema;