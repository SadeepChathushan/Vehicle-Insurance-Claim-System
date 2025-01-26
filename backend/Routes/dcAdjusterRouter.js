const { registerClient ,registerVehicle} = require('../Controllers/DCAController');
const ensureAuthenticated = require('../Middlewares/ensureAuthenticated');
const router = require('express').Router();

// Route to register a new DCAdjuster, accessible only by authenticated admins
router.post('/register-client', registerClient);
router.post('/register-vehicle', registerVehicle);
// router.post('/register-vehicle', registerVehicle);

module.exports = router;
