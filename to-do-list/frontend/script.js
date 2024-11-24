document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const saveButton = document.getElementById('save-tasks');

    const tasks = [];

    // Add Task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = { text: taskText, completed: false };
            tasks.push(task);
            renderTask(task);
            taskInput.value = '';
        }
    });

    // Render Task
    function renderTask(task) {
        const listItem = document.createElement('li');
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.addEventListener('click', () => {
            task.completed = !task.completed;
            listItem.style.textDecoration = task.completed ? 'line-through' : 'none';
        });

        const taskText = document.createElement('span');
        taskText.textContent = task.text;

        const cross = document.createElement('span');
        cross.className = 'cross';
        cross.innerHTML = '&times;';
        cross.addEventListener('click', () => {
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            listItem.remove();
        });

        taskDiv.append(circle, taskText);
        listItem.append(taskDiv, cross);
        taskList.appendChild(listItem);
    }

    // Save Tasks
    saveButton.addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tasks.json';
        a.click();
        URL.revokeObjectURL(url);

        // Refresh the page
        tasks.length = 0;
        taskList.innerHTML = '';
    });
});







