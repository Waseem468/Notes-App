const mongoose = require("mongoose");
// const bcrypt=require("bcrypt");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
    }
},
    {
        timestamps: true
    })
const Note = new mongoose.model("Note", NoteSchema);
module.exports = Note;