const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'CLIENT', 'HCADJUSTER', 'DCADJUSTER'],
        required: true,
    },
    contact: {
        type : Number,
        required: true,
    },
    city: {
        type: String,
        required: true, 
    },
    address: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    adminId: {
        type: String,
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;