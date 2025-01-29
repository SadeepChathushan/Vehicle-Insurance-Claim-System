const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaimSchema = new Schema({
    clientId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    vehicleNum: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,   
    },
    mobileNumber: {
        type: String, // Storing it as a string to accommodate formats like "+94XXXXXXX"
        required: true,
    },
    status: {
        type: String,
        enum: ["Reported", "InProgress", "Confirmed", "Completed"],
        default: "Reported"
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    } ,
    assignedAgent: {
        type: String,
    },
    customerMetStatus: {
        type: Boolean,
        default: false // This will default to false indicating that the status has not been met yet
    },
    customerMetStatus: {
        type: Boolean,
        default: false // This indicates that the status has not been met yet
    },
    imageUrls: [{
        type: String, // Now an array of strings
        default: [] // Default to an empty array
    }]
});

const ClaimModel = mongoose.model('Claim', ClaimSchema);
module.exports = ClaimModel;
