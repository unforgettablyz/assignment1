const express = require('express');
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me);

module.exports = router;
