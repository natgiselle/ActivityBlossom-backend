const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    avatarFlower: {
        type: String,
        default: 'default'
    }
});

module.exports = mongoose.model('User', UserSchema); 