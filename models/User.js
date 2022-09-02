const { Schema, model } = require('mongoose');

// Use schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: true,
      min_length: 8,
      max_length: 50
    },
    events: [
      {
          type: Schema.Types.ObjectId,
          ref: 'event',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);


const User = model('user', userSchema);

module.exports = User;