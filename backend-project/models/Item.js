const mongoose = require('mongoose');
const ThoughtNodeSchema = require('./Thought');

const ItemSchema = new mongoose.Schema({
    // Required Fields for all items
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
        required: false,
    },
    ItemType: { // is actually "$type"
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

    // Not required for all items
    ExamineText: {
        type: String,
        required: false,
    },
    IsInInventory: {
        type: Boolean,
        required: false,
    },
    UseAble: {
        type: Boolean,
        required: false,
    },
    PickUpAble: {
        type: Boolean,
        required: false,
    },
    CombineAble: {
        type: Boolean,
        required: false,
    },
    GiveAble: {
        type: Boolean,
        required: false,
    },
    UseWith: {
        type: Boolean,
        required: false,
    },
    ItemDependency: { // is an Object ID
        type: String,
        required: false,
    },
    CombineItem: {
        type: mongoose.Schema.Types.ObjectId,  // ItemSchema
        ref: 'ItemSchema',
        required: false,
    },
    Thought: {
        type: ThoughtNodeSchema,
        required: false,
    },
});

module.exports = ItemSchema;