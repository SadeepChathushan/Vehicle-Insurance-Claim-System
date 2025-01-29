const { registerClient ,registerVehicle, getClaims ,updateAgent ,getAssignedClaims} = require('../Controllers/DCAController');
const ensureAuthenticated = require('../Middlewares/ensureAuthenticated');
const router = require('express').Router();

// Route to register a new DCAdjuster, accessible only by authenticated admins
router.post('/register-client', registerClient);
router.post('/register-vehicle', registerVehicle);
router.get('/get-claims/:userId', getClaims);
router.put('/updateAgent/:claimId', updateAgent);
router.get('/get-Assignedclaims/:userId', getAssignedClaims);

module.exports = router;
