function createTask() {
    const taskLabel = document.getElementById('taskLabelInput').value.trim();
    if (!taskLabel) {
        showToast('task label is required');
        return
    }
    const taskDescription = document.getElementById('taskDescriptionInput').value.trim();

    // Define the API endpoint
    const apiEndpoint = 'https://task-manager-4xy3.onrender.com/task';

    // Set up the request payload
    const payload = {
        label: taskLabel,
        description: taskDescription
    };

    // Make the POST request to the backend API
    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task created:', data);
            // Clear the form
            document.getElementById('taskLabelInput').value = '';
            document.getElementById('taskDescriptionInput').value = '';
            showToast('Task created successfully');
            // Optionally, add code to update the UI
        })
        .catch(error => {
            console.error('Error creating task:', error);
            showToast('Error creating task'); // Show error in toast notification
        });
}


function loadTasks() {
    fetch('https://task-manager-4xy3.onrender.com/tasks')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load tasks');
            }
            return response.json();
        })
        .then(tasks => {
            const taskListElement = document.getElementById('taskList');
            taskListElement.innerHTML = ''; // Clear the list before adding new tasks
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                taskItem.id = `task-${task.task_id}`;
                taskItem.innerHTML = `
                <div class="task-content">${task.task_label}</div>
                <button onclick="markTaskDone(${task.task_id})" class="mark-done-btn" title="Mark as done">&#10003;</button>
                <button onclick="deleteTask(${task.task_id})" class="delete-btn" title="Delete Task">&times;</button>
            `;
                taskListElement.appendChild(taskItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Failed to load tasks');
        });
}


function deleteTask(taskId) {
    console.log('Deleting task:', taskId);
    fetch(`https://task-manager-4xy3.onrender.com/task/${taskId}`, {method: 'DELETE'})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Remove the task from the UI
            const taskItem = document.getElementById(`task-${taskId}`);
            if (taskItem) {
                taskItem.remove();
                showToast('Task deleted');
            }
        })
        .catch(error => {
            console.error('Error deleting task:', error);
            showToast('Error deleting task'); // Show error in toast notification
        });
}


function markTaskDone(taskId) {
    console.log('Marking task as done:', taskId);
    // Select the task item based on taskId
    const taskItem = document.getElementById(`task-${taskId}`);
    const isCompleted = taskItem.classList.contains('COMPLETED');

    // Determine the new status based on whether the task is already marked as completed
    const newStatus = isCompleted ? 'PENDING' : 'COMPLETED';

    // Update the UI to reflect the change
    if (isCompleted) {
        taskItem.classList.remove('COMPLETED');
    } else {
        taskItem.classList.add('COMPLETED');
    }

    // Call the backend API to update the task's status
    fetch(`https://task-manager-4xy3.onrender.com/task/${taskId}?status=${newStatus}`, {
        method: 'PUT'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            showToast(`Task marked as ${newStatus}`);
        })
        .catch(error => {
            console.error('Error updating task status:', error);
            showToast('Error updating task status'); // Show error in toast notification
        });
}


function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Make the toast visible
    setTimeout(() => {
        toast.classList.add('visible');
    }, 100);

    // Hide and remove the toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('visible');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}


