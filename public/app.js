const API_URL = 'http://localhost:3000/tasks';
const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const errorMsg = document.getElementById('error-msg');
const submitBtn = document.getElementById('submit-btn');

// Fetch and display tasks
async function fetchTasks() {
    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();
        renderTasks(tasks);
    } catch (err) {
        showError('Failed to fetch tasks. Is the server running?');
    }
}

function renderTasks(tasks) {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No tasks yet. Create one!</p>';
        return;
    }

    tasks.forEach((task, index) => {
        const dateText = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date';
        const catText = task.category || 'Uncategorized';
        
        const taskEl = document.createElement('div');
        taskEl.className = `task-item animate-fade ${task.completed ? 'completed' : ''}`;
        taskEl.style.animationDelay = `${index * 0.05}s`;
        
        taskEl.innerHTML = `
            <div class="task-content">
                <div class="task-title">${escapeHtml(task.title)}</div>
                ${task.description ? `<div class="task-desc">${escapeHtml(task.description)}</div>` : ''}
                <div class="task-meta">
                    <span class="badge">📅 ${dateText}</span>
                    <span class="badge">🏷️ ${catText}</span>
                </div>
            </div>
            <div class="task-actions">
                ${!task.completed ? `<button class="btn-icon success" onclick="markComplete(${task.id})" title="Mark Complete">✓</button>` : ''}
                <button class="btn-icon" onclick='editTask(${JSON.stringify(task).replace(/'/g, "&#39;")})' title="Edit">✎</button>
                <button class="btn-icon danger" onclick="deleteTask(${task.id})" title="Delete">✕</button>
            </div>
        `;
        taskList.appendChild(taskEl);
    });
}

// Handle form submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.innerText = '';
    
    const id = document.getElementById('task-id').value;
    const payload = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('dueDate').value || null,
        category: document.getElementById('category').value || null
    };

    try {
        let res;
        if (id) {
            // Update task
            res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            // Create task
            res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Operation failed');
        }

        form.reset();
        document.getElementById('task-id').value = '';
        submitBtn.innerText = 'Add Task';
        fetchTasks();

    } catch (err) {
        showError(err.message);
    }
});

// Edit Task
window.editTask = (task) => {
    document.getElementById('task-id').value = task.id;
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description || '';
    document.getElementById('dueDate').value = task.dueDate ? task.dueDate.split('T')[0] : '';
    document.getElementById('category').value = task.category || '';
    
    submitBtn.innerText = 'Update Task';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Mark Complete
window.markComplete = async (id) => {
    try {
        const res = await fetch(`${API_URL}/${id}/complete`, {
            method: 'PATCH'
        });
        if (!res.ok) throw new Error('Failed to mark complete');
        fetchTasks();
    } catch (err) {
        showError(err.message);
    }
};

// Delete Task
window.deleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete task');
        fetchTasks();
    } catch (err) {
        showError(err.message);
    }
};

function showError(msg) {
    errorMsg.innerText = msg;
    setTimeout(() => errorMsg.innerText = '', 5000);
}

function escapeHtml(unsafe) {
    return String(unsafe)
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}


fetchTasks();
