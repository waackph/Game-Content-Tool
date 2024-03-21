const mongoose = require('mongoose');
const AnimationSchema = require('./Animation');
const SequenceSchema = require('./Sequence')

// ***
// The data base schema of a Thought Tree. It contains a schema for the Link and the Node of the Tree.
// ***

const ThoughtLinkSchema = new mongoose.Schema({
    linkType: {
        type: String,
        required: true,
    },
    Id: {
        type: Number,
        required: true,
    },
    ValidMoods: {
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
    IsFinal: {
        type: Boolean,
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
        type: Number,
        required: false,
    },
    IsSuccessEdge: {
        type: Boolean,
        required: false,
    },
    Animation: {
        type: AnimationSchema,
        required: false,
    },
    sequence: {
        type: SequenceSchema,
        required: false,
    }
}, { strict: false });

const ThoughtNodeSchema = new mongoose.Schema({
    thoughtType: {
        type: String,
        required: true,
    },
    Id: {
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
        type: Number,
        required: false,
    },
    LinkageId: { // is an Object ID
        type: Number,
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
}, { strict: false });

module.exports = ThoughtNodeSchema;