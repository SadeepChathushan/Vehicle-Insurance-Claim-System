const ensureAuthenticated = require('../Middlewares/ensureAuthenticated');
const { getClaims , updatedC} = require('../Controllers/AgentController');
const router = require('express').Router();

// Route to add a claim
router.get('/get-claims/:userId', getClaims);
router.post('/update-details', updatedC);
// router.post('/claims/:userId',customerMeet);

module.exports = router;
