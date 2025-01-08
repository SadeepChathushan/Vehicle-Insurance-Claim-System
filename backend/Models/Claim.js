const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClaimSchema = new Schema({
    clientId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        
    },
    status: {
        type: String,
        enum: ["Reported", "InProgress", "Confirmed", "Completed"],
        default: "Reported"
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }  

})

const ClaimModel = mongoose.model('Claim', ClaimSchema);
module.exports = ClaimModel;