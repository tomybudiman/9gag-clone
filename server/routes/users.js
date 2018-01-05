const router = require('express').Router();

const userControl = require('../controllers/controlUsers');

// Login with Social Media
router.post('/login-sm',userControl.loginSocmed);

module.exports = router;
