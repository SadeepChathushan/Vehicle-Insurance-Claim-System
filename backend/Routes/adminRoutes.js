const { registerDCAdjuster, registerClient ,registerVehicle,registerHCAdjuster ,getAdminProfile} = require('../Controllers/AdminController');
const ensureAuthenticated = require('../Middlewares/ensureAuthenticated');
const router = require('express').Router();

// Route to register a new DCAdjuster, accessible only by authenticated admins
router.post('/register-DCAdjuster', registerDCAdjuster);
router.post('/register-client', registerClient);
router.post('/register-vehicle', registerVehicle);
router.post('/register-HCAdjuster', registerHCAdjuster);
router.get('/profile/:adminId' , getAdminProfile);

module.exports = router;
