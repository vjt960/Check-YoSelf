const taskTitleInput = document.querySelector('#title-input');
const taskItemInput = document.querySelector('.task-form__inner-input');
const taskForm = document.querySelector('.task-form');
const uTaskList = document.querySelector('ul');
const clearAllBtn = document.querySelector('#clear-btn');
const standbyTasks = [];

taskForm.addEventListener('submit', submitTask);
clearAllBtn.addEventListener('click', clearAll);

function submitTask(e) {
  var randId = Date.now();
  var listItem = `<li class="list__item"><input id="${randId}" type="checkbox"><label for="${randId}">${taskItemInput.value}</label></li>`;
  e.preventDefault();
  var taskItem = {
    key: randId,
    task: taskItemInput.value,
    done: false
  };
  standbyTasks.push(taskItem);
  uTaskList.innerHTML += listItem;
  clearTaskInput();
}

function clearAll() {
  document.querySelector('.task-form').reset();
  uTaskList.innerHTML = '';
  standbyTasks.length = 0;
}

function clearTaskInput() {
  taskItemInput.value = '';
}
