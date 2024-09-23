const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  roomNumber: {
    type: String,
  },
  roomType: {
    type: String,
    enum: ['single', 'sharing'],
    default: 'sharing',
  },
});

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
  image: String, 
  tenants: [tenantSchema],
});

module.exports = mongoose.model('Property', propertySchema);
