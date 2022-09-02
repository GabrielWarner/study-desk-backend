const { Schema, model } = require('mongoose');

const noteSchema = new Schema(
    {
        id: {
            type: Number,
        },
        text:{
            type: String,
            required: true,
        },
        date:{
            type: Date,
            required: true,
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const Note = model('note', noteSchema);

module.exports = Note