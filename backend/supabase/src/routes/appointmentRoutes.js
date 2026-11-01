const express = require('express');
const appointmentController = require('../controllers/appointmentController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();

router.use(authMiddleware);

router.get('/', appointmentController.getMyAppointments);
router.post('/', appointmentController.createAppointment);

module.exports = router;
