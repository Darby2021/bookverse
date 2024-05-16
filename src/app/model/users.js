const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    full_name: {type: String, required: true},
    phone: {type: String, required: true},
    role: {type: String, required: true},
    follows: {
        type: Number,
        default: 0
    }
}
, {timestamps: true})

module.exports = UserSchema