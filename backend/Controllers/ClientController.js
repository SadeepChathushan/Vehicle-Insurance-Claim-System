const bcrypt = require('bcrypt');
const Claim = require('../Models/Claim');
const User = require('../Models/User');
const Vehicle = require('../Models/Vehicle');

const addClaim = async (req, res) => {
  try {
    // Get client and vehicle information from the request body
    const { userId, mobileNumber, vehicleNum, location, description } = req.body;
    
    // Check if required fields are provided
    if (!userId || !mobileNumber || !vehicleNum || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate the client
    const client = await User.findById(userId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Validate the vehicle
    // const vehicle = await Vehicle.findById(vehicleId);
    // if (!vehicle) {
    //   return res.status(404).json({ error: 'Vehicle not found' });
    // }

    // Create a new claim
    const newClaim = new Claim({
      clientId: client._id, // Client's ObjectId
      vehicleNum, // Vehicle's ObjectId
      location,
      description,
      mobileNumber,
    });

    // Save the claim to the database
    await newClaim.save();

    // Return success response
    res.status(201).json({
      message: 'Claim added successfully',
      claimId: newClaim._id, // Return the claim ID
      success: true
    });
  } catch (err) {
    console.error('Add Claim Error:', err);
    res.status(500).json({
      error: 'Internal server error',
      success: false
    });
  }
};


const getClaimsForUser = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from route parameter

    const claims = await Claim.find({ clientId: userId });
    if (claims.length === 0) {
      return res.status(404).json({ error: 'No claims found for this user' });
    }

    res.status(200).json({
      message: 'Claims retrieved successfully',
      success: true,
      claims,
    });
  } catch (err) {
    console.error('Get Claims Error:', err);
    res.status(500).json({
      error: 'Internal server error',
      success: false,
    });
  }
};

module.exports = {
  addClaim,
  getClaimsForUser,
};