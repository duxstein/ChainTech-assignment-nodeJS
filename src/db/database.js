const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'todo_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const initDatabase = async () => {
  try {
    // Create the database if it doesn't exist
    const tempConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    const dbName = process.env.DB_NAME || 'todo_app';
    await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    await tempConnection.end();

    // Now connect using the pool and create the tasks table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        dueDate DATE NULL,
        category VARCHAR(100) NULL,
        completed BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    console.log('Database and tasks table initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = {
  pool,
  initDatabase
};
