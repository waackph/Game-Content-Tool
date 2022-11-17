const mongoose = require('mongoose');
// const AnimationSchema = require('./Animation');
const DialogNodeSchema = require('./DialogTree');
const ThoughtNodeSchema = require('./Thought');

// ***
// The data base schema of a the Character and PuzzleCharacter objects
// ***

const CharacterSchema = new mongoose.Schema({
    // Required Fields for all characters
    characterType: {
        type: String,
        required: true,
    },
    Id: {
        type: Number,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    texturePath: {
        type: String,
        required: true,
    },
    Rotation: {
        type: Number,
        required: true,
    },
    PositionX: {
        type: Number,
        required: true,
    },
    PositionY: {
        type: Number,
        required: true,
    },
    ItemDependency: {
        type: String,  // Is Object ID
        required: false,
    },
    DialogUnlocked: {
        type: Boolean,
        required: false,
    },
    Pronoun: {
        type: String,
        required: false,
    },
    CatchPhrase: {
        type: String,
        required: false,
    },
    GiveAble: {
        type: Boolean,
        required: false,
    },
    MoodChange: {
        type: Number,
        required: false,
    },
    TreeStructure: {
        type: [DialogNodeSchema],
        required: false,
    },
    Thought: {
        type: ThoughtNodeSchema,
        required: false,
    },
    // Animation: {
    //     type: AnimationSchema,
    //     required: false,
    // },
});

module.exports = CharacterSchema;