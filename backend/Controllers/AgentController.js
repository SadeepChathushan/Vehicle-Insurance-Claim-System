const bcrypt = require('bcrypt');
const Claim = require('../Models/Claim');
const User = require('../Models/User'); // Import the User model to verify the role

const getClaims = async (req, res) => {
    try {
        const agentId = req.params.userId; // Get the agent ID from URL parameters

        // Fetch the agent details including the name
        const agent = await User.findOne({ _id: agentId, role: { $in: ['AGENT'] } }).select('name');
        if (!agent) {
            return res.status(404).json({ error: 'No agent found with the given ID', success: false });
        }

        // Fetch all claims assigned to this agent
        const claims = await Claim.find({ assignedAgent: agentId }).lean();

        if (claims.length === 0) {
            return res.status(404).json({ error: 'No claims found for this agent', success: false });
        }

        // Attach the agent's name to each claim for the response
        const enhancedClaims = claims.map(claim => ({
            ...claim,
            agentName: agent.name // Add agent's name to each claim
        }));

        res.json({
            message: 'Claims retrieved successfully',
            success: true,
            agentName: agent.name, // Include the agent's name in the response
            claims: enhancedClaims
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Internal server error',
            success: false
        });
    }
};


const updatedC = async (req, res) => {
    const { claimId, description, imageUrls, customerMetStatus } = req.body;
    try {
        const updatedClaim = await Claim.findByIdAndUpdate(claimId, {
            $set: {
                description: description,
                imageUrls: imageUrls,
                customerMetStatus: customerMetStatus
            }
        }, { new: true });

        res.status(200).json({
            message: 'Claim updated successfully',
            success: true,
            claim: updatedClaim
        });
    } catch (error) {
        console.error('Failed to update claim:', error);
        res.status(500).json({
            error: 'Internal server error',
            success: false
        });
    }
};



module.exports = {
    getClaims,
    updatedC
};
