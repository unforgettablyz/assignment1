require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./supabase/src/routes/authRoutes.js');
const appointmentRoutes = require('./supabase/src/routes/appointmentRoutes.js');
const adminAppointmentRoutes = require('./supabase/src/routes/adminAppointmentRoutes.js');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin-appointments', adminAppointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
