const { pool } = require('../db/database');

const Task = {
  create: async (taskData) => {
    const { title, description, dueDate, category } = taskData;
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, dueDate, category) VALUES (?, ?, ?, ?)',
      [title, description || null, dueDate || null, category || null]
    );
    return { id: result.insertId, ...taskData, completed: false };
  },

  findAll: async () => {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY createdAt DESC');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0];
  },

  update: async (id, taskData) => {
    const { title, description, dueDate, category } = taskData;
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, dueDate = ?, category = ? WHERE id = ?',
      [title, description || null, dueDate || null, category || null, id]
    );
    return { id, ...taskData };
  },

  markCompleted: async (id) => {
    await pool.query('UPDATE tasks SET completed = true WHERE id = ?', [id]);
    return { id, completed: true };
  },

  delete: async (id) => {
    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Task;
