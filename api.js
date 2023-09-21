const express = require('express');
const router = express.Router();

let tasks = [];

// GET all tasks
router.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST a new task
router.post('/tasks', (req, res) => {
  const { task } = req.body;
  tasks.push(task);
  res.json({ message: 'Task added successfully', task });
});

// DELETE a task by Index
router.delete('/tasks/:name', (req, res) => {
  const taskNameToDelete = req.params.name;
  const taskIndex = tasks.findIndex((task) => task === taskNameToDelete);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

module.exports = router;
