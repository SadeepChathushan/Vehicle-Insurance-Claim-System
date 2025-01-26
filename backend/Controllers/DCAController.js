const UserModel = require('../Models/User');
const VehicleModel = require('../Models/Vehicle')
const Claim = require('../Models/Claim')
const bcrypt = require('bcrypt');



const registerClient = async (req, res) => {
    try {
      // Extract client information from the request body
      const { name, email, contact, city, address, nic, dob } = req.body;
  
      // Check if the client already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Client already exists', success: false });
      }
  
      // Create a new User instance with the role set to 'CLIENT'
      const newClient = new UserModel({
        name,
        email,
        role: 'CLIENT',
        contact,
        city,
        address,
        nic,
        dob
      });
  
      // Hash the password before saving
      newClient.password = await bcrypt.hash(newClient.nic, 10);
  
      // Save the new client (user)
      await newClient.save();
  
      // Respond with success and return the client ID for further use
      res.status(201).json({
        message: 'Client registered successfully',
        clientId: registerClient._id, // Return the client ID to associate the vehicle later
        success: true
      });
    } catch (err) {
      console.error('Register Client Error:', err);
      res.status(500).json({
        message: 'Internal server error',
        success: false
      });
    }
  };
  
 
  
  const User = require('../Models/User'); // Ensure this line is here
const Vehicle = require('../Models/Vehicle'); // Ensure this line is here

const registerVehicle = async (req, res) => {
  try {
    // Ensure all required fields are in the request
    const { clientNic, policyNo, type, engineNo, periodCoverStart, periodCoverEnd, ChassisNo, mModel } = req.body;

    // // Check if all required fields are provided
    // if (!clientNic || !policyNo || !type || !engineNo || !periodCoverStart || !periodCoverEnd || !ChassisNo || !mModel) {
    //   return res.status(400).json({ error: 'Missing required fields' });
    // }

    // Find the user by NIC (assuming NIC is unique for a user)
    const user = await User.findOne({ nic: clientNic });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Create a new vehicle using the found user's _id
    const newVehicle = new Vehicle({
      clientNic: user._id,  // Use the ObjectId from User
      policyNo,
      type,
      engineNo,
      periodCoverStart,
      periodCoverEnd,
      ChassisNo,
      mModel,
    });

    await newVehicle.save();
    res.status(201).json({ message: 'Vehicle registered successfully' });
  } catch (err) {
    console.error('Register Vehicle Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};




  
  module.exports = {
    registerClient,
    registerVehicle,
};
