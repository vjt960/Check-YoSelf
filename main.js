const taskTitleInput = document.querySelector('#title-input');
const taskItemInput = document.querySelector('.task-form__inner-input');
const taskForm = document.querySelector('.task-form');
const uTaskList = document.querySelector('ul');
const clearAllBtn = document.querySelector('#clear-btn');
const standbyTasks = [];

taskForm.addEventListener('submit', submitTask);
taskForm.addEventListener('click', removeTask);
clearAllBtn.addEventListener('click', clearAll);

function submitTask(e) {
  var randId = Date.now();
  var listItem = `<li id="${randId}" class="list__item"><div class="task-wrap"><img class="delete-btn" src="check-yo-self-icons/delete.svg"><label for="${randId}">${taskItemInput.value}</label></div></li>`;
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

function removeTask(e) {
  if (e.target.className === 'delete-btn') {
    for (var i = 0; i < standbyTasks.length; i++) {
      if (standbyTasks[i].key === parseInt(e.target.parentNode.id)) {
        standbyTasks.splice(i, 1);
      }
    }
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
}
