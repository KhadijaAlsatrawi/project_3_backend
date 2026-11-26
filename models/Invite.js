const mongoose = require('mongoose')

const inviteSchema = new mongoose.Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    code:{
        type: String,
        trim: true,
        unique: true
    }
}, {timestamps: true})

const Invite = mongoose.model('Invite', inviteSchema)

module.exports = Invite