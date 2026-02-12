// src/config/database.js

/**
 * Database connection module
 * This would normally connect to a real database
 */
const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Execute a query
 * @param {string} sql - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
async function query(sql, params = []) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  query,
  pool
};
