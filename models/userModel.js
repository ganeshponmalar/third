const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter  name']
    },
    email: {
        type: String,
        required: [true, 'please enter  email'],
        unique: true,

    },

    password: {
        type: String,
        required: [true, 'please enter password'],
        maxlength: [6, 'password cannot exceed 6 characters'],
        select: false  // here to hinding password completely
    },

    avatar: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,

    creatAt: {
        type: Date,
        default: Date.now
    },


})


userSchema.pre('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 10) //user id we are getting here

})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {  //generating the token here using id
        expiresIn: process.env.JWT_EXPIRES_TIME

    })

}

userSchema.methods.isValidPassword = async function (enteredPassword) {
  return await  bcrypt.compare(enteredPassword, this.password)   //comparing the encrypted  data and user entered data                   

}

let model = mongoose.model('User', userSchema);

module.exports = model;



