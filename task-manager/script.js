const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add new task
async function addTodo() {
    const todoInput = inputBox.value;

    if (todoInput) {
        // Sending the new task to the Flask backend
        const response = await fetch('http://127.0.0.1:5000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                todo_list: todoInput
            })
        });

        const data = await response.json();
        console.log(data.message);  // Log success/failure message
        inputBox.value = '';  // Clear input box

        // Refresh the task list after adding the new task
        fetchTodos();
    } else {
        console.log("Please enter a to-do item.");
    }
}

// Fetch existing tasks from the backend
async function fetchTodos() {
    const response = await fetch('http://127.0.0.1:5000/get');
    const data = await response.json();

    listContainer.innerHTML = '';  // Clear current list
    data.todos.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.todo_list;  // Display to-do item
        listContainer.appendChild(li);
    });
}

// Call fetchTodos() when the page loads to display the existing to-do items
document.addEventListener('DOMContentLoaded', fetchTodos); 
