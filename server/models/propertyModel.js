// models/Property.js
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  location: String,
  furnished: {
    type: Boolean,
    default: false,
  },
  genderAllowed: {
    type: String,
    enum: ['female', 'male', 'any'],
    default: 'any',
  },
  occupancyType: {
    type: String,
    enum: ['single', 'sharing'],
    default: 'single',
  },
  agent: {
    email: {
      type: String,
      required: true,
    },
  },
  image: String, // URL to the property's image
});

module.exports = mongoose.model('Property', propertySchema);
