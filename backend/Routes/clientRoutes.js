const { registerClient ,registerVehicle} = require('../Controllers/DCAController');
const ensureAuthenticated = require('../Middlewares/ensureAuthenticated');
const { addClaim , getClaimsForUser} = require('../Controllers/ClientController');
const router = require('express').Router();

// Route to add a claim
router.post('/add', addClaim);
router.post('/get-claims/:userId', getClaimsForUser);

module.exports = router;
