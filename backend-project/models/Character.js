const mongoose = require('mongoose');
// const AnimationSchema = require('./Animation');
const DialogNodeSchema = require('./DialogTree');

const CharacterSchema = new mongoose.Schema({
    // Required Fields for all characters
    Name: {
        type: String,
        required: true,
    },
    texture_path: {
        type: String,
        required: false,
    },
    $type: {
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
    IsInInventory: {
        type: Boolean,
        required: false,
    },
    ItemDependency: {
        type: String,  // Is Object ID
        required: true,
    },
    DialogUnlocked: {
        type: Boolean,
        required: true,
    },
    TreeStructure: {
        type: [DialogNodeSchema],
        required: true,
    },
    Pronoun: {
        type: String,
        required: true,
    },
    CatchPhrase: {
        type: String,
        required: true,
    },
    GiveAble: {
        type: Boolean,
        required: true,
    },
    MoodChange: {
        type: Number,
        required: true,
    },
    // Animation: {
    //     type: AnimationSchema,
    //     required: false,
    // },
});

module.exports = CharacterSchema;