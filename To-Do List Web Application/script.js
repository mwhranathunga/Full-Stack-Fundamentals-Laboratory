// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const errorMsg = document.getElementById('errorMsg');
const emptyState = document.getElementById('emptyState');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Task state management
let tasks = JSON.parse(localStorage.getItem('cyanTasks')) || [];
let currentFilter = 'all';

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompletedBtn.addEventListener('click', clearCompletedTasks);

filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.getAttribute('data-filter');
        renderTasks();
    });
});

// Add Task with validation
function addTask() {
    const taskText = taskInput.value.trim();

    // Input validation: empty string check
    if (taskText === "") {
        errorMsg.classList.remove('d-none');
        return;
    }

    errorMsg.classList.add('d-none');

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    taskInput.value = '';
    renderTasks();
}

// Render tasks based on filter selection
function renderTasks() {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    if (filteredTasks.length === 0) {
        emptyState.classList.remove('d-none');
    } else {
        emptyState.classList.add('d-none');
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center rounded-3 mb-2 shadow-sm task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="form-check d-flex align-items-center">
                <input class="form-check-input me-2" type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
                <span class="task-text fw-medium">${escapeHtml(task.text)}</span>
            </div>
            <button class="btn btn-outline-danger btn-sm border-0" onclick="deleteTask(${task.id})" title="Delete Task">
                <i class="bi bi-trash"></i>
            </button>
        `;

        taskList.appendChild(li);
    });

    updateCounter();
}

// Toggle Task Completion Status
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

// Delete Individual Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Clear Completed Tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

// Update Active Task Counter
function updateCounter() {
    const remainingCount = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `${remainingCount} remaining`;
}

// Save to LocalStorage (Optional feature included)
function saveTasks() {
    localStorage.setItem('cyanTasks', JSON.stringify(tasks));
}

// Escape HTML utility to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Initial Render
renderTasks();