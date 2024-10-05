const express = require('express');
const router = express.Router();

const registerController = require('../controllers/auth/register');
const loginController = require('../controllers/auth/login');

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;