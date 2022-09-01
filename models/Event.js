const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        start:{
            type: Date,
            required: true,
        },
        end:{
            type: Date,
            required: true,
        }
        // description: {
        //     type: String
        // }
        // location
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const Event = model('event', eventSchema);

module.exports = Event