const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');


// POST /tasks - Create a new task
router.post('/', taskController.createTask);

// GET /tasks - Get all tasks
router.get('/', taskController.getAllTasks);

// PUT /tasks/:id - Update task details
router.put('/:id', taskController.updateTask);

// PATCH /tasks/:id/complete - Mark task as complete
router.patch('/:id/complete', taskController.markComplete);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
