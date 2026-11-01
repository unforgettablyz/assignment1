const express = require('express');
const appointmentController = require('../controllers/appointmentController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const requireAdmin = require('../middleware/requireAdmin.js');

const router = express.Router();

router.use(authMiddleware, requireAdmin);

router.get('/', appointmentController.getAdminAppointments);

module.exports = router;
