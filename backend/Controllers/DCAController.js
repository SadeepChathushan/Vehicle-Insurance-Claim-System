const mongoose = require('mongoose');
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
        role,
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


// const getClaims = async (req, res) => {
//   try {
//     const { userId } = req.params; // Extract userId from route parameter

//     // Verify if the user exists and fetch their city
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     const userCity = user.city; // Get user's city

//     // Fetch claims where the location matches the user's city
//     const claims = await Claim.find({ location: userCity });
//     if (claims.length === 0) {
//       return res.status(404).json({ error: 'No claims found for this city' });
//     }

//     res.status(200).json({
//       message: 'Claims retrieved successfully',
//       success: true,
//       claims,
//     });
//   } catch (err) {
//     console.error('Get Claims Error:', err);
//     res.status(500).json({
//       error: 'Internal server error',
//       success: false,
//     });
//   }
// };

const getClaims = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from route parameter

    // Verify if the user exists and fetch their city
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userCity = user.city.toString(); // Convert user city to string
    const nic = user.nic.toString();
    const name = user.name.toString();

    // Fetch claims where the location matches the user's city and assignedAgent is empty or null
    const claims = await Claim.find({ 
      location: userCity, 
      assignedAgent: { $in: [null, ''] } // Check that the assignedAgent is not set (null or empty)
    });

    if (claims.length === 0) {
      return res.status(404).json({ error: 'No claims found for this city or all claims have an assigned agent' });
    }

    // Fetch agents from the same city and log the result for debugging
    const agents = await User.find({ city: userCity, role: 'AGENT' }).select('name');
    console.log(agents); // Check the agent data returned

    if (agents.length === 0) {
      return res.status(404).json({ error: 'No agents found for this city' });
    }

    res.status(200).json({
      message: 'Claims and agents retrieved successfully',
      success: true,
      claims,
      nic,
      name,
      agents, // Send agents' names
    });
  } catch (err) {
    console.error('Get Claims Error:', err);
    res.status(500).json({
      error: 'Internal server error',
      success: false,
    });
  }
};

const updateAgent = async (req, res) => {
  try {
    // const { claimId } = req.params; // Extract the claimId from the URL
    const { agentId } = req.body; // Extract the agentId from the request body

    console.log(req.params); // Log the entire params object
const { claimId } = req.params;
console.log('claimId:', claimId);

    // Find the claim by claimId
    const claim = await Claim.findById(claimId);
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }

    // Check if the agent exists
    const agent = await User.findById(agentId);
    if (!agent || agent.role !== 'AGENT') {
      return res.status(404).json({ error: 'Agent not found or invalid role' });
    }

    // Update the assignedAgent field with the new agentId
    claim.assignedAgent = agentId;
    await claim.save(); // Save the updated claim

    res.status(200).json({
      message: 'Agent updated successfully',
      claim, // Optionally return the updated claim data
    });
  } catch (err) {
    console.error('Error details:', err); // Log the error in more detail
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
};


const getAssignedClaims = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from route parameter

    // Verify if the user exists and fetch their city
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userCity = user.city.toString(); // Convert user city to string
    const nic = user.nic.toString();
    const name = user.name.toString();

    // Fetch claims where the location matches the user's city and assignedAgent is not null or empty
    const claims = await Claim.find({
      location: userCity,
      assignedAgent: { $nin: [null, ''] }, // This filters claims where assignedAgent is not null or empty
    });

    if (claims.length === 0) {
      return res.status(404).json({ error: 'No claims found for this city or all claims are unassigned' });
    }

    // Map the claims to include only the name of the assigned agent
    const claimsWithAssignedAgent = await Promise.all(claims.map(async (claim) => {
      const assignedAgent = await User.findById(claim.assignedAgent).select('name'); // Get only the agent's name
      return {
        ...claim.toObject(), // Ensure we return a plain JavaScript object
        assignedAgent: assignedAgent ? assignedAgent.name : 'Not assigned', // Show 'Not assigned' if no agent is assigned
      };
    }));

    res.status(200).json({
      message: 'Assigned Claims retrieved successfully',
      success: true,
      claims: claimsWithAssignedAgent,
      nic,
      name,
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
  registerClient,
  registerVehicle,
  getClaims,
  updateAgent,
  getAssignedClaims
};
