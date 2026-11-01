const jwt = require('jsonwebtoken');

const signAccessToken = (user) => {
  return jwt.sign(
    { sub: String(user.id), email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
};

module.exports = { signAccessToken, verifyAccessToken };
