function createTask() {
    const taskLabel = document.getElementById('taskLabelInput').value.trim();
    const taskDescription = document.getElementById('taskDescriptionInput').value.trim();

    // Define the API endpoint
    const apiEndpoint = 'http://localhost:8888/task';

    // Setup the request payload
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