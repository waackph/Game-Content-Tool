const mongoose = require('mongoose');
const CombineItemSchema = require('./CombineItem');
const ThoughtNodeSchema = require('./Thought');

// ***
// The data base schema of an Item object. It represents all possible Item subclasses.
// ***

const ItemSchema = new mongoose.Schema({
    // Required Fields for all items
    ItemType: { // is actually "$type"
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
        required: false,
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
    DrawOrder: {
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
        type: CombineItemSchema,
        required: false,
    },

    // Door properties
    RoomId: { // is an Object ID
        type: Number,
        required: false,
    },
    DoorId: { // is an Object ID
        type: Number,
        required: false,
    },
    IsUnlocked: { // is an Object ID
        type: Boolean,
        required: false,
    },
    InitPlayerPosX: {
        type: Number,
        required: false,
    },
    InitPlayerPosY: {
        type: Number,
        required: false,
    },
    CloseTexturePath: {
        type: String,
        required: false,
    },
    IsRoomChangeDoor: {
        type: Boolean,
        required: false,
    },

    // Thought data structure
    Thought: {
        type: ThoughtNodeSchema,
        required: false,
    },
}, { strict: false });

module.exports = ItemSchema;