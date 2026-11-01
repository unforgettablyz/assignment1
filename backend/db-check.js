require('dotenv').config();

const pool = require('./supabase/src/config/db.js');

const run = async () => {
  try {
    const result = await pool.query('SELECT NOW() AS now');
    console.log('Database connected at', result.rows[0].now);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();
