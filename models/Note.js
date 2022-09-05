const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat");
const noteSchema = new Schema(
    {
        // id: {
        //     type: Number,
        // },
        // noteId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => new Types.ObjectId(),
        // },
        text:{
            type: String,
            required: true,
        },
        date:{
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        },
        userid:
        {
            //  type: Schema.Types.ObjectId, ref: 'user',
            type: String,
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

module.exports = Note;