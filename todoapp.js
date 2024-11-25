// Carregar tarefas do localStorage ao iniciar
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task.id, task.text));
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText) {
    const taskId = Date.now(); // ID único baseado no timestamp
    renderTask(taskId, taskText);
    saveTask(taskId, taskText);
    taskInput.value = ""; // Limpar campo de entrada
  }
}

function renderTask(id, text) {
  const taskList = document.getElementById("taskList");

  // Criar item de tarefa com opções de edição e exclusão
  const taskItem = document.createElement("li");
  taskItem.className = "flex justify-between items-center bg-gray-200 p-3 rounded";
  taskItem.dataset.id = id;

  const taskText = document.createElement("span");
  taskText.className = "flex-grow";
  taskText.textContent = text;
  taskItem.appendChild(taskText);

  // Botão de edição
  const editButton = document.createElement("button");
  editButton.className = "text-blue-500 hover:text-blue-700 mx-2";
  editButton.textContent = "Editar";
  editButton.onclick = () => editTask(taskItem);
  taskItem.appendChild(editButton);

  // Botão de exclusão
  const deleteButton = document.createElement("button");
  deleteButton.className = "text-red-500 hover:text-red-700";
  deleteButton.textContent = "Excluir";
  deleteButton.onclick = () => deleteTask(taskItem);
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
}

function saveTask(id, text) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ id, text });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(taskItem) {
  const newText = prompt("Edite a tarefa:", taskItem.querySelector("span").textContent);
  if (newText !== null) {
    taskItem.querySelector("span").textContent = newText;

    // Atualizar tarefa no localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(task => task.id == taskItem.dataset.id);
    task.text = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function deleteTask(taskItem) {
  taskItem.remove();

  // Remover tarefa do localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const updatedTasks = tasks.filter(task => task.id != taskItem.dataset.id);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
