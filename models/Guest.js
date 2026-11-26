const mongoose = require('mongoose')

const guestSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    phoneNumber:{
        type: String,
        trim: true
    },
    profileImage:{
        type: String,
        trim: true
    }
}, {timestamps: true})

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest