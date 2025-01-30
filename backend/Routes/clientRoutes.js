const { registerClient ,registerVehicle} = require('../Controllers/DCAController');
const ensureAuthenticated = require('../Middlewares/ensureAuthenticated');
const { addClaim , getClaimsForUser , getdClientProfile} = require('../Controllers/ClientController');
const router = require('express').Router();

// Route to add a claim
router.post('/add', addClaim);
router.post('/get-claims/:userId', getClaimsForUser);
router.get('/profile/:userId' , getdClientProfile);

module.exports = router;
