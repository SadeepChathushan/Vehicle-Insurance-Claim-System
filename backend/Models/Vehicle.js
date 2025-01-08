const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    policyNo: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    engineNo: {
      type: String,
      unique: true,
      required: true,
    },
    periodCoverStart: {       //period of cover start date
        type: Date,
        required: true,
    },
    periodCoverEnd: {        //period of cover end date
        type: Date,
        required: true,
    },
    ChassisNo: {       
        type: String,
        required: true,
    },
    mModel: {                // make model = Honda
        type: String,
        required: true,
    },

  });
  
  const VehicleModel = mongoose.model('Vehicle', VehicleSchema);
  module.exports = VehicleModel;