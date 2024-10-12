let todos = [];

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText === "") {
        alert("Please enter a task.");
        return;
    }

    const newTodo = {
        id: Date.now(),
        text: todoText,
        completed: false,
        editable: false
    };

    todos.push(newTodo);
    todoInput.value = "";
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement('li');

        // Terapkan class 'completed' ke li, tapi hanya mempengaruhi span
        if (todo.completed && !todo.editable) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }

        if (todo.editable) {
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${todo.id})">
                <input type="text" value="${todo.text}" id="edit-input-${todo.id}">
                <button class="edit-btn" onclick="saveEdit(${todo.id})">Save</button>
                <button onclick="deleteTodo(${todo.id})">Delete</button>
            `;
        } else {
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="toggleComplete(${todo.id})">
                <span>${todo.text}</span>
                <div>
                    <button class="edit-btn" onclick="editTodo(${todo.id})">Edit</button>
                    <button onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
            `;
        }

        todoList.appendChild(li);
    });
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    todo.editable = true;
    renderTodos();
}

function saveEdit(id) {
    const editInput = document.getElementById(`edit-input-${id}`);
    const newTodoText = editInput.value.trim();

    if (newTodoText === "") {
        alert("Task cannot be empty.");
        return;
    }

    const todo = todos.find(todo => todo.id === id);
    todo.text = newTodoText;
    todo.editable = false;
    renderTodos();
}

function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    renderTodos();
}
