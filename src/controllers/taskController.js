const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;
    
    // Validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Task title cannot be empty' });
    }

    const newTask = await Task.create({ title, description, dueDate, category });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, category } = req.body;

    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validation
    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({ error: 'Task title cannot be empty' });
    }
    
    const updatedData = {
      title: title || existingTask.title,
      description: description !== undefined ? description : existingTask.description,
      dueDate: dueDate !== undefined ? dueDate : existingTask.dueDate,
      category: category !== undefined ? category : existingTask.category,
    };

    const result = await Task.update(id, updatedData);
    res.status(200).json({ ...existingTask, ...result, completed: existingTask.completed });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (existingTask.completed) {
      return res.status(400).json({ error: 'Task is already marked as completed' });
    }

    await Task.markCompleted(id);
    res.status(200).json({ message: 'Task marked as complete', id });
  } catch (error) {
    console.error('Error marking task complete:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const deleted = await Task.delete(id);
    if (deleted) {
      res.status(200).json({ message: 'Task deleted successfully', id });
    } else {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
