const taskTitleInput = document.querySelector('#title-input');
const taskItemInput = document.querySelector('.task-form__inner-input');
const taskForm = document.querySelector('.task-form');
const uTaskList = document.querySelector('ul');
const clearAllBtn = document.querySelector('#clear-btn');

taskForm.addEventListener('click', submitTask);
clearAllBtn.addEventListener('click', clearAll);

function submitTask(e) {
  var randId = Date.now();
  e.preventDefault();
  if (e.target.className === 'task-form__inner-btn') {
    uTaskList.innerHTML += `<li class="list__item">
            <input id="${randId}" type="checkbox"><label for="${randId}">${taskItemInput.value}</label>
          </li>`;
    clearTaskInput();
  }
}

function clearAll() {
  console.log('clearing');
  document.querySelector('.task-form').reset();
  uTaskList.innerHTML = '';
}

function clearTaskInput() {
  taskItemInput.value = '';
}