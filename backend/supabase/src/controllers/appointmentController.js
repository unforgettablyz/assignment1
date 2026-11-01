const crypto = require('crypto');
const pool = require('../config/db.js');

const PURPOSE_CATEGORIES = ['Academic', 'Career', 'Personal', 'Other'];
const STATUSES = ['Pending', 'Approved', 'Rejected'];
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

// DATE and TIME are cast to text so a UTC+8 date never shifts back a day in JSON.
const APPOINTMENT_COLUMNS = `
  a.id, a.student_id, a.preferred_date::text AS preferred_date,
  to_char(a.preferred_time, 'HH24:MI') AS preferred_time,
  a.purpose_category, a.status, a.processed_by, a.processed_at,
  a.created_at, a.updated_at
`;

const cleanString = (value) => (typeof value === 'string' ? value.trim() : '');

const isValidDate = (value) => {
  if (!DATE_PATTERN.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};

// GET /api/appointments — the logged-in student's own appointments
exports.getMyAppointments = async (req, res, next) => {
  try {
    const studentId = req.user.sub;

    const result = await pool.query(
      `SELECT ${APPOINTMENT_COLUMNS}
       FROM appointments a
       WHERE a.student_id = $1
       ORDER BY a.preferred_date DESC, a.preferred_time DESC`,
      [studentId]
    );

    res.status(200).json({ appointments: result.rows });
  } catch (error) {
    next(error);
  }
};

// POST /api/appointments — FR2 add appointment (always starts Pending)
exports.createAppointment = async (req, res, next) => {
  try {
    const studentId = req.user.sub;
    const {
      preferred_date: rawDate,
      preferred_time: rawTime,
      purpose_category: rawCategory,
    } = req.body || {};

    const preferredDate = cleanString(rawDate);
    const preferredTime = cleanString(rawTime);
    const purposeCategory = cleanString(rawCategory);

    if (!preferredDate || !preferredTime || !purposeCategory) {
      return res.status(400).json({
        message: 'preferred_date, preferred_time and purpose_category are required',
      });
    }
    if (!isValidDate(preferredDate)) {
      return res.status(400).json({ message: 'preferred_date must be a valid date in YYYY-MM-DD format' });
    }
    if (!TIME_PATTERN.test(preferredTime)) {
      return res.status(400).json({ message: 'preferred_time must be in HH:MM format' });
    }
    if (!PURPOSE_CATEGORIES.includes(purposeCategory)) {
      return res.status(400).json({
        message: `purpose_category must be one of: ${PURPOSE_CATEGORIES.join(', ')}`,
      });
    }

    const id = `apt_${crypto.randomUUID()}`;

    const result = await pool.query(
      `INSERT INTO appointments AS a (id, student_id, preferred_date, preferred_time, purpose_category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING ${APPOINTMENT_COLUMNS}`,
      [id, studentId, preferredDate, preferredTime, purposeCategory]
    );

    res.status(201).json({ message: 'Appointment created', appointment: result.rows[0] });
  } catch (error) {
    if (error.code === '23503') {
      return res.status(400).json({ message: 'Unknown student' });
    }
    next(error);
  }
};

// GET /api/admin-appointments?status=Pending — admin list with student names
exports.getAdminAppointments = async (req, res, next) => {
  try {
    const status = cleanString((req.query || {}).status);

    if (status && !STATUSES.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${STATUSES.join(', ')}` });
    }

    const params = [];
    let where = '';
    if (status) {
      params.push(status);
      where = 'WHERE a.status = $1';
    }

    const result = await pool.query(
      `SELECT ${APPOINTMENT_COLUMNS}, u.name AS student_name
       FROM appointments a
       JOIN users u ON u.id = a.student_id
       ${where}
       ORDER BY a.preferred_date ASC, a.preferred_time ASC`,
      params
    );

    res.status(200).json({ appointments: result.rows });
  } catch (error) {
    next(error);
  }
};
