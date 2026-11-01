require('dotenv').config();

const fs = require('fs');
const path = require('path');
const pool = require('./supabase/src/config/db.js');

const run = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'supabase', 'init.sql'), 'utf8');
    await pool.query(sql);
    console.log('Database tables created');
  } catch (error) {
    console.error('Failed to initialise database:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();
