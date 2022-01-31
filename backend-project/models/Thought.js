const mongoose = require('mongoose');
const AnimationSchema = require('./Animation');

const ThoughtLinkSchema = new mongoose.Schema({
    $type: {
        type: String,
        required: true,
    },
    _validMoods: {
        type: [Number],
        required: true,
    },
    Option: {
        type: String,
        required: true,
    },
    IsLocked: {
        type: Boolean,
        required: true,
    },
    NextNode: {
        type: mongoose.Schema.Types.ObjectId,  // ThoughtNodeSchema,
        ref: 'ThoughtNodeSchema',
    },
    
    // Only required for FinalThoughtLinks
    Verb: {
        type: Number,
        required: false,
    },
    MoodChange: {
        type: Number,
        required: true,
    },
    UnlockId: { // is an Object ID
        type: String,
        required: true,
    },
    Animation: {
        type: AnimationSchema,
        required: false,
    },
});

const ThoughtNodeSchema = new mongoose.Schema({
    Thought: {
        type: String,
        required: true,
    },
    IsRoot: {
        type: Boolean,
        required: true,
    },
    ThingId: { // is an Object ID
        type: String,
        required: true,
    },
    _linkageId: { // is an Object ID
        type: String,
        required: true,
    },
    Links: {
        type: [ThoughtLinkSchema],
        required: true,
    }
});

module.exports = ThoughtNodeSchema;