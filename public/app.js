document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const taskList = document.getElementById('task-list');
  const tasks = []; // Client-side array to store tasks

  function createTaskElement(task, index) {
      const li = document.createElement('li');
      li.style.position = 'relative'; // Set li's position to relative
      li.style.paddingRight = '30px'; // Create space on the right for the delete button
      li.textContent = task;

      // Create a delete button with absolute positioning
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.style.position = 'absolute';
      deleteButton.style.right = '5px'; // Adjust the right distance as needed
      deleteButton.style.top = '50%'; // Vertically center the button
      deleteButton.style.transform = 'translateY(-50%)'; // Adjust to vertically center the button
      deleteButton.addEventListener('click', () => {
          deleteTask(index);
          taskList.removeChild(li);
      });

      li.appendChild(deleteButton);

      taskList.appendChild(li);
  }

  function addTask(task) {
      fetch('/api/tasks', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ task }),
      })
          .then((response) => response.json())
          .then((data) => {
              tasks.push(data.task); // Add the new task to the client-side array
              createTaskElement(data.task, tasks.length - 1);
          });
  }

  function deleteTask(index) {
      fetch(`/api/tasks/${index}`, {
          method: 'DELETE',
      })
          .then((response) => response.json())
          .then((data) => {
              console.log(data.message);
          });
  }

  function fetchAndDisplayTasks() {
      fetch('/api/tasks')
          .then((response) => response.json())
          .then((data) => {
              tasks.length = 0; // Clear the client-side array
              data.forEach((task, index) => {
                  tasks.push(task); // Populate the client-side array
                  createTaskElement(task, index);
              });
          });
  }

  todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskInput = document.getElementById('task');
      const task = taskInput.value.trim();
      if (task) {
          addTask(task);
          taskInput.value = '';
      }
  });

  fetchAndDisplayTasks();
});
