const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: [true, 'User name is required']
    },
    role:{
        type: String
        },
})

const User = mongoose.model('User', userSchema)
module.exports = User;