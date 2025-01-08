const UserModel = require('../Models/User');
const VehicleModel = require('../Models/Vehicle')
const bcrypt = require('bcrypt');

// Controller method to register a new DCAdjuster
const registerDCAdjuster = async (req, res) => {
  try {
    // Extract DCAdjuster information from the request body
    const { name, email, password, contact, city, address, nic, dob } = req.body;
    
    // Check if the DCAdjuster already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'DCAdjuster already exists', success: false });
    }

    // Create a new User instance with the role set to 'DCAdjuster'
    const newDCAdjuster = new UserModel({
      name,
      email,
      password: nic,
      role: 'DCADJUSTER',
      contact,
      city,
      address,
      nic,
      dob
    });

    // Hash the password before saving
    newDCAdjuster.password = await bcrypt.hash(newDCAdjuster.password, 10);

    // Save the new DCAdjuster
    await newDCAdjuster.save();

    // Respond with success
    res.status(201).json({
      message: 'DCAdjuster registered successfully',
      success: true
    });
  } catch (err) {
    console.error('Register DCAdjuster Error:', err);
    res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};




// Controller method to register a new HCAdjuster
const registerHCAdjuster = async (req, res) => {
  try {
    // Extract HCAdjuster information from the request body
    const { name, email, password, contact, city, address, nic, dob } = req.body;
    
    // Check if the HCAdjuster already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'HCAdjuster already exists', success: false });
    }

    // Create a new User instance with the role set to 'HCAdjuster'
    const newHCAdjuster = new UserModel({
      name,
      email,
      password: nic,
      role: 'HCADJUSTER',
      contact,
      city,
      address,
      nic,
      dob
    });

    // Hash the password before saving
    newHCAdjuster.password = await bcrypt.hash(newHCAdjuster.password, 10);

    // Save the new HCAdjuster
    await newHCAdjuster.save();

    // Respond with success
    res.status(201).json({
      message: 'HCAdjuster registered successfully',
      success: true
    });
  } catch (err) {
    console.error('Register HCAdjuster Error:', err);
    res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};



const registerClient = async (req, res) => {
  try {
    // Extract client information from the request body
    const { name, email, password, contact, city, address, nic, dob } = req.body;

    // Check if the client already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Client already exists', success: false });
    }

    // Create a new User instance with the role set to 'CLIENT'
    const newClient = new UserModel({
      name,
      email,
      password,
      role: 'CLIENT',
      contact,
      city,
      address,
      nic,
      dob
    });

    // Hash the password before saving
    newClient.password = await bcrypt.hash(newClient.password, 10);

    // Save the new client (user)
    await newClient.save();

    // Respond with success and return the client ID for further use
    res.status(201).json({
      message: 'Client registered successfully',
      clientId: newClient._id, // Return the client ID to associate the vehicle later
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


// Controller method to register a new Vehicle for an existing client
const registerVehicle = async (req, res) => {
  try {
    // Extract vehicle information from the request body
    const {
      clientId, // The ID of the registered client
      policyNo,
      type,
      engineNo,
      periodCoverStart,
      periodCoverEnd,
      ChassisNo,
      mModel
    } = req.body;

    // Verify that the client exists
    const client = await UserModel.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found', success: false });
    }

    // Create a new Vehicle instance
    const newVehicle = new VehicleModel({
      clientId,
      policyNo,
      type,
      engineNo,
      periodCoverStart,
      periodCoverEnd,
      ChassisNo,
      mModel
    });

    // Save the new vehicle
    await newVehicle.save();

    // Respond with success
    res.status(201).json({
      message: 'Vehicle registered successfully',
      success: true
    });
  } catch (err) {
    console.error('Register Vehicle Error:', err);
    res.status(500).json({
      message: 'Internal server error',
      success: false
    });
  }
};




// Controller method to fetch admin profile details
const getAdminProfile = async (req, res) => {
  try {
    const { adminId } = req.params; // Extract admin ID from URL params

    // Find admin by ID
    const admin = await UserModel.findOne({ adminId }); // If adminId is a separate field in the schema


    // If admin not found, return 404
    if (!admin || admin.role !== 'ADMIN') {
      return res.status(404).json({
        message: 'Admin not found',
        success: false,
      });
    }

    // Return admin details
    res.status(200).json({
      message: 'Admin profile retrieved successfully',
      success: true,
      data: {
        name: admin.name,
        email: admin.email,
        contact: admin.contact,
        city: admin.city,
        address: admin.address,
        nic: admin.nic,
        dob: admin.dob,
        role: admin.role,
      },
    });
  } catch (err) {
    console.error('Get Admin Profile Error:', err);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};



// Controller method to update admin profile details
const updateAdminProfile = async (req, res) => {
  try {
    const { adminId } = req.params; // Extract admin ID from URL params
    const { name, city, address, contact, dob } = req.body; // Extract updated fields from request body

    // Find and update admin details
    const updatedAdmin = await UserModel.findByIdAndUpdate(
      adminId,
      { name, city, address, contact, dob },
      { new: true } // Return the updated document
    );

    // If admin not found, return 404
    if (!updatedAdmin) {
      return res.status(404).json({
        message: 'Admin not found',
        success: false,
      });
    }

    // Return updated admin details
    res.status(200).json({
      message: 'Admin profile updated successfully',
      success: true,
      data: updatedAdmin,
    });
  } catch (err) {
    console.error('Update Admin Profile Error:', err);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

// Controller method to change admin password
const changeAdminPassword = async (req, res) => {
  try {
    const { adminId } = req.params; // Extract admin ID from URL params
    const { currentPassword, newPassword } = req.body; // Extract passwords from request body

    // Find admin by ID
    const admin = await UserModel.findById(adminId);
    if (!admin) {
      return res.status(404).json({
        message: 'Admin not found',
        success: false,
      });
    }

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Current password is incorrect',
        success: false,
      });
    }

    // Hash the new password and update it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    // Return success response
    res.status(200).json({
      message: 'Password updated successfully',
      success: true,
    });
  } catch (err) {
    console.error('Change Admin Password Error:', err);
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};







module.exports = {
    registerDCAdjuster,
    registerClient,
    registerVehicle,
    registerHCAdjuster,
    getAdminProfile
};
