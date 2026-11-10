const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const pendingEmpty = document.getElementById('pendingEmpty');
const completedEmpty = document.getElementById('completedEmpty');
const STORAGE_KEY = 'todo-app-items';
let todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
function saveTodos() { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); }
function renderTodos() { const pending = todos.filter((todo) => !todo.completed); const completed = todos.filter((todo) => todo.completed); pendingList.innerHTML = ''; completedList.innerHTML = ''; pending.forEach((todo) => { const item = document.createElement('li'); item.className = 'task-item'; item.innerHTML = `<div class="task-main"><span class="task-text">${todo.text}</span></div><div class="task-actions"><button class="complete-btn" data-id="${todo.id}">Mark Complete</button><button class="edit-btn" data-id="${todo.id}">Edit</button><button class="delete-btn" data-id="${todo.id}">Delete</button></div>`; pendingList.appendChild(item); }); completed.forEach((todo) => { const item = document.createElement('li'); item.className = 'task-item completed'; item.innerHTML = `<div class="task-main"><span class="task-text">${todo.text}</span></div><div class="task-actions"><button class="edit-btn" data-id="${todo.id}">Edit</button><button class="delete-btn" data-id="${todo.id}">Delete</button></div>`; completedList.appendChild(item); }); pendingCount.textContent = `${pending.length} pending`; completedCount.textContent = `${completed.length} completed`; pendingEmpty.classList.toggle('visible', pending.length === 0); completedEmpty.classList.toggle('visible', completed.length === 0); }
function addTodo(text) { const cleanText = text.trim(); if (!cleanText) return; todos.unshift({ id: Date.now().toString(), text: cleanText, completed: false, createdAt: new Date().toISOString(), completedAt: null }); saveTodos(); renderTodos(); }
function toggleComplete(id) { todos = todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null } : todo); saveTodos(); renderTodos(); }
function deleteTodo(id) { todos = todos.filter((todo) => todo.id !== id); saveTodos(); renderTodos(); }
function editTodo(id) { const todo = todos.find((item) => item.id === id); const updatedText = window.prompt('Edit your task:', todo.text); if (updatedText === null) return; const trimmed = updatedText.trim(); if (!trimmed) return; todos = todos.map((item) => item.id === id ? { ...item, text: trimmed } : item); saveTodos(); renderTodos(); }
todoForm.addEventListener('submit', (event) => { event.preventDefault(); addTodo(todoInput.value); todoInput.value = ''; todoInput.focus(); });
pendingList.addEventListener('click', (event) => { const target = event.target; const id = target.dataset.id; if (!id) return; if (target.classList.contains('complete-btn')) toggleComplete(id); if (target.classList.contains('delete-btn')) deleteTodo(id); if (target.classList.contains('edit-btn')) editTodo(id); });
completedList.addEventListener('click', (event) => { const target = event.target; const id = target.dataset.id; if (!id) return; if (target.classList.contains('delete-btn')) deleteTodo(id); if (target.classList.contains('edit-btn')) editTodo(id); });
renderTodos();