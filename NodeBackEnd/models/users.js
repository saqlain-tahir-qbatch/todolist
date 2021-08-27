const mongoose = require('mongoose')
const validator = require('validator')
const users = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: [3, "Name should ne 3 characters log"]
    },
    email:{
        type: String,
        required: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalide Email')
            }
        }
    },
    password:{
        type: String,
        required: true,
        min: 5
    }
})
const user = new mongoose.model('Users'  , users)
module.exports = user