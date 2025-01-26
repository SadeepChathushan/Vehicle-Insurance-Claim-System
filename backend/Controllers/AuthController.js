const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signupAdmin = async (req, res) => {
    try {
        const { name, email, password, role, contact, city, address,nic,dob } = req.body;

        // Ensure the role is 'admin' for this specific endpoint
        if (role !== 'ADMIN') {
            return res.status(400).json({
                message: "Invalid role. Only 'admin' registration is allowed here.",
                success: false
            });
        }

        // Check if the email already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can log in',
                success: false
            });
        }

        // Retrieve the last admin ID and generate the next admin ID
        const lastAdmin = await UserModel.findOne({ role: 'ADMIN' })
            .sort({ adminId: -1 }) // Sort by adminId in descending order
            .exec();

        let newAdminId = "A001"; // Default ID if no admin exists yet
        if (lastAdmin && lastAdmin.adminId) {
            const lastIdNumber = parseInt(lastAdmin.adminId.substring(1)); // Extract numeric part
            newAdminId = `A${String(lastIdNumber + 1).padStart(3, '0')}`; // Increment and format
        }

        // Create a new admin user
        const userModel = new UserModel({ name, email, password, role, adminId: newAdminId , contact, city, address,nic,dob});
        userModel.password = await bcrypt.hash(password, 10); // Hash the password
        await userModel.save();

        // Respond with success and include the generated adminId
        res.status(201).json({
            message: "Signup successfully",
            success: true,
            adminId: newAdminId
        });
    } catch (err) {
        console.error("Error during admin signup:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = { signupAdmin };







const signup = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password, role });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

         // Prepare the response object
         const response = {
            message: "Login Success",
            success: true,
            jwtToken,
            email: user.email,
            name: user.name,
            role: user.role,
            userId: user._id,
        };

        // If the user's role is ADMIN, include the adminId in the response
        if (user.role === 'ADMIN') {
            response.adminId = user.adminId; // Assuming `_id` is the adminId
        }

        // Send the response
        res.status(200).json(response);
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    signup,
    login,
    signupAdmin
}