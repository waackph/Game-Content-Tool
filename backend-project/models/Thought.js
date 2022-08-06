const mongoose = require('mongoose');
const AnimationSchema = require('./Animation');

const ThoughtLinkSchema = new mongoose.Schema({
    // $type: {
    //     type: String,
    //     required: true,
    // },
    Id: {
        type: Number,
        required: false,
    },
    _validMoods: {
        type: [Number],
        required: false,
    },
    Option: {
        type: String,
        required: true,
    },
    IsLocked: {
        type: Boolean,
        required: false,
    },
    NextNode: {
        type: mongoose.Schema.Types.Mixed, // mongoose.Schema.Types.ObjectId,  // ThoughtNodeSchema,
        // ref: 'ThoughtNodeSchema',
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
    
    // Only required for FinalThoughtLinks
    Verb: {
        type: Number,
        required: false,
    },
    MoodChange: {
        type: Number,
        required: false,
    },
    UnlockId: { // is an Object ID
        type: String,
        required: false,
    },
    Animation: {
        type: AnimationSchema,
        required: false,
    },
});

const ThoughtNodeSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: false,
    },
    Thought: {
        type: String,
        required: true,
    },
    IsRoot: {
        type: Boolean,
        required: false,
    },
    ThingId: { // is an Object ID
        type: String,
        required: false,
    },
    _linkageId: { // is an Object ID
        type: String,
        required: false,
    },
    Links: {
        type: [ThoughtLinkSchema],
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
});

module.exports = ThoughtNodeSchema;