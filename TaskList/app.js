const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const LS_TASKS = 'tasks';

loadEventListeners();

function loadEventListeners() {
  loadTasksFromLocalStorageEvent();
  addTaskEvent();
  removeTaskEvent();
  clearAllTasksEvent();
  filterTasksEvent();
}

function loadTasksFromLocalStorage() {
  let jsonTasks = localStorage.getItem(LS_TASKS);
  if(jsonTasks !== null) {
    const tasks = JSON.parse(jsonTasks)
    tasks.forEach(function(task){
      const li = document.createElement('li')
      li.className = 'collection-item';
    
      const text = document.createTextNode(task);
      
      const link = document.createElement('a');
      link.className = 'delete-item secondary-content';
      link.innerHTML = '<i class="fa fa-remove"></i>'
    
      li.appendChild(text);
      li.appendChild(link);
    
    taskList.appendChild(li);})
  }

}

function storeTaskInLocalStorage(task) {
  let tasks;
  const localStorageTasks = localStorage.getItem(LS_TASKS);
  if(localStorageTasks === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorageTasks);
  }
  tasks.push(task);
  localStorage.setItem(LS_TASKS, JSON.stringify(tasks));
}

function loadTasksFromLocalStorageEvent() {
  // This is event that will be called directly after the DOM is loaded. 
  document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage)
}

function addTaskEvent() {
  form.addEventListener('submit', addTask);
}

function removeTaskEvent() {
  taskList.addEventListener('click', removeTask)
}

function clearAllTasksEvent() {
  clearBtn.addEventListener('click', removeAllTasks);
}

function filterTasksEvent() {
  filter.addEventListener('keyup', filterTasks);
}

function filterTasks(event) {
  const text = event.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(colItem) {
    if(colItem.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
      colItem.style.display = 'block';
    }
    else {
      colItem.style.display = 'none';
    }
  });
}

function removeTaskFromLocalStorage(task) {
  let savedTasks = JSON.parse(localStorage.getItem(LS_TASKS));
  updatedTasks = savedTasks.filter(function(elem) {
    return elem !== task;
  });

  if(updatedTasks.length !== 0) {
    localStorage.setItem(LS_TASKS, JSON.stringify(updatedTasks));
  } else {
    localStorage.removeItem(LS_TASKS);
  }
}

function removeAllTasksFromLocalStorage() {
  localStorage.removeItem(LS_TASKS);

}

function removeAllTasks() {
  if(confirm('Do you really want to delete all tasks?!'))
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    removeAllTasksFromLocalStorage();
}

function removeTask(event) {
  if(event.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure that you want to delete this task?')) {
      event.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(event.target.parentElement.parentElement.textContent)
    }
  }
}

function addTask(event) {
  if(taskInput.value === '')
    alert('Specify task')
  else
    createTaskElement();

  event.preventDefault();
  taskInput.value = '';
}

function createTaskElement() {
  const li = document.createElement('li')
  li.className = 'collection-item';

  const text = document.createTextNode(taskInput.value);
  
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>'

  li.appendChild(text);
  li.appendChild(link);

  taskList.appendChild(li);
  storeTaskInLocalStorage(taskInput.value);
}