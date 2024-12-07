const mysql = require('mysql2'); // Use mysql2 instead of mysql

// Create a pool with promise support
const pool = mysql.createPool({
  host: 'localhost', // update as necessary
  user: 'root', // update as necessary
  password: '', // update as necessary
  database: 'society_management', // update as necessary
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); // Use .promise() to enable promise-based functions

module.exports = pool;
