const mongoose = require('mongoose');

// ***
// The data base schema of a Dialog Tree. It contains a schema for the Edge and the Node of the Tree.
// ***

const DialogEdgeSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
    },
    _nextNodeId: {
        type: Number,  // Is Object ID
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
    isFinalDialogOption: {
        type: Boolean,
        required: false,
    },
    x: {
        type: Number,
        required: false,
    },
    y: {
        type: Number,
        required: false,
    },
}, { strict: false });

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
}, { strict: false });

module.exports = DialogNodeSchema;