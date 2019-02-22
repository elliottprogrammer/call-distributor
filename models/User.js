const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'dro', 'reg', 'spectator'],
        default: 'spectator'
    },
    password: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('users', UserSchema);
module.exports = User;