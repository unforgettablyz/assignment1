const bcrypt = require('bcryptjs');
const pool = require('../config/db.js');
const { signAccessToken } = require('../config/auth.js');

// POST /api/auth/login — FR1
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!cleanEmail || typeof password !== 'string' || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await pool.query(
      'SELECT id, name, email, role, password_hash FROM users WHERE email = $1',
      [cleanEmail]
    );
    const row = result.rows[0];

    if (!row || !(await bcrypt.compare(password, row.password_hash))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = { id: row.id, name: row.name, email: row.email, role: row.role };
    const token = signAccessToken(user);

    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout — FR1 (stateless JWT: the client discards the token)
exports.logout = async (req, res, next) => {
  try {
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
exports.me = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [req.user.sub]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    next(error);
  }
};
