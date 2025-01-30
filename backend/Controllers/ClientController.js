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


const getdClientProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Extract the user ID from URL params

    console.log('Finding client with ID:', userId);
const client = await UserModel.findById(userId);
console.log('Client found:', client);
    // If adjuster not found or role mismatch
    if (!client || client.role !== 'CLIENT') {
      return res.status(404).json({
        message: 'Client not found',
        success: false,
      });
    }

    // Return adjuster details
    res.status(200).json({
      message: 'Client profile retrieved successfully',
      success: true,
      data: {
        name: client.name,
        email: client.email,
        contact: client.contact,
        city: client.city,
        address: client.address,
        nic: client.nic,
        dob: client.dob,
        role: client.role,
      },
    });
  } catch (err) {
    console.error('Get Client Profile Error:', err);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};


module.exports = {
  addClaim,
  getClaimsForUser,
  getdClientProfile
};