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
  e.preventDefault();
  var randId = Date.now();
  var listItem = `<li id="${randId}"><div class="task-wrap"><img class="delete-btn" src="check-yo-self-icons/delete.svg"><label for="${randId}">${taskItemInput.value}</label></div></li>`;
  var taskItem = {
    key: randId,
    task: taskItemInput.value,
    done: false
  };
  if (taskItemInput.value === '') {
    alert('You must enter a task item!')
  } else {
      standbyTasks.push(taskItem);
      uTaskList.innerHTML += listItem;
      clearTaskInput();
    }
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
      if (standbyTasks[i].key === parseInt(e.target.parentNode.parentNode.id)) {
        standbyTasks.splice(i, 1);
      }
    }
    e.target.closest('li').remove();
  }
}
