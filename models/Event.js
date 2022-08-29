const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String
        }
        // startTime
        // endTime
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