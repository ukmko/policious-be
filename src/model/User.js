const mongoose = require('mongoose');

const { regex } = require('../helpers');

const User = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input your name'],
  },
  phone: {
    type: String,
    unique: [true, 'This phone number has been taken'],
    match: [
      regex.phonePattern, 'Please input a valid phone number',
    ],
    required: [true, 'Please input a phone number'],
  },
  province: {
    type: String,
    required: [true, 'Please select a province']
  },
  city: {
    type: String,
    required: [true, 'Please select a city']
  },
  role: {
    type: Number,
    enum: [0, 1, 2],
  },
}, { timestamps: true, toObject: { getters: true, virtuals: false } });

module.exports = mongoose.model('users', User);