const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON requests
app.use(express.json());

// Create an array to store tasks
const tasks = [];

// API endpoint to get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// API endpoint to add a task
app.post('/api/tasks', (req, res) => {
    const task = req.body.task;
    tasks.push(task);
    res.json({ task });
});

// API endpoint to delete a task by its index
app.delete('/api/tasks/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json({ message: 'Task deleted successfully' });
    } else {
        res.status(400).json({ error: 'Invalid index' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
