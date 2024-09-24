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

const applicantSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  email:{
    type: String,
  },
  phoneNum:{
    type: String,
  },
  fundingType: {
    type: String,
    enum: ['NSFAS', 'Self funded', 'Private Bursary'],
  },
  roomType: {
    type: String,
    enum: ['single', 'sharing'],
    default: 'sharing',
  },
})

const requestSchema = new mongoose.Schema({
  name:{
    type: String,
  },
  email:{
    type: String,
  },
  phoneNum:{
    type: String,
  },
  date:{
    type:Date,
  }
})

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
  applicants: [applicantSchema],
  viewingRequests: [requestSchema],
});

module.exports = mongoose.model('Property', propertySchema);