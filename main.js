const taskTitleInput = document.querySelector('#title-input');
const taskItemInput = document.querySelector('.task-form__inner-input');
const taskForm = document.querySelector('.task-form');
const uTaskList = document.querySelector('ul');
const clearAllBtn = document.querySelector('#clear-btn');
const makeTaskBtn = document.querySelector('#create-card-btn');
const mainElement = document.querySelector('main');
const taskCards = [];

window.addEventListener('load', pageLoad);
taskForm.addEventListener('submit', submitTaskItem);
taskForm.addEventListener('click', removeTaskItem);
makeTaskBtn.addEventListener('click', stageTasks)
clearAllBtn.addEventListener('click', clearAll);
mainElement.addEventListener('click', deleteTaskCard);
mainElement.addEventListener('click', checkOff)


function checkOff(e) {
  var ul = document.querySelector('.card-body__ul');
  for (var i = 0; i < ul.childNodes.length; i++) {
    if (e.target.parentNode === ul.childNodes[i]) {
    console.log(taskCards[0].tasks[i]);
    }
  }
}



function submitTaskItem(e) {
  e.preventDefault();
  var randId = document.querySelectorAll('.list-item').length;
  var listItem = `<li class="list-item" id="${randId}"><div class="task-wrap"><img class="delete-btn" src="check-yo-self-icons/delete.svg"><label for="${randId}">${taskItemInput.value}</label></div></li>`;
  if (taskItemInput.value === '') {
    alert('You must enter a task item!')
  } else {
      uTaskList.innerHTML += listItem;
      clearTaskInput();
    }
}

function removeTaskItem(e) {
  if (e.target.className === 'delete-btn') {
    e.target.closest('li').remove();
  }
}

function stageTasks() {
  var standbyTasks = [];
  var stbyTasks = document.querySelectorAll('.list-item');
  if  (taskTitleInput.value.length < 1 && stbyTasks.length < 1) {
    alert('You must have a Title and at least one Task Item on your list!');
  } else {
    for (var i = 0; i < stbyTasks.length; i++) {
      var randId = Date.now();
      var taskItem = {
        id: i,
        task: document.querySelectorAll('.list-item')[i].childNodes[0].childNodes[1].childNodes[0].data,
        done: false
      }
      standbyTasks.push(taskItem);
    }
    createTask(standbyTasks);
  }
}

function createTask(tasks) {
  var taskCard = new ToDoList(Date.now(), taskTitleInput.value, tasks);
    taskCards.push(taskCard);
    injectTask(taskCard);
    injectTaskItem(taskCard);
    taskCard.saveToStorage();
    clearAll();
}




function clearAll() {
  document.querySelector('.task-form').reset();
  uTaskList.innerHTML = '';
}

function clearTaskInput() {
  taskItemInput.value = '';
}



function injectTask(obj) {
  mainElement.insertAdjacentHTML('afterbegin', `<article class="card" data-id="${obj.id}">
      <header class="card-header">${obj.title}</header>
      <section class="card-body">
        <ul class="card-body__ul">
        </ul>
      </section>
      <footer class="card-footer">
        <div class="card-footer__img--wrap urgent__img">
          <img class="card-footer__img" src="check-yo-self-icons/urgent.svg">
          <p class="card-footer__img--text">
            URGENT
          </p>
        </div>
        <div class="card-footer__img--wrap delete__img">
          <img class="card-footer__img" src="check-yo-self-icons/delete.svg">
          <p class="card-footer__img--text">
            DELETE
          </p>
        </div>
      </footer>
    </article>` );
}

function injectTaskItem(obj) {
  var dataIdKey = `[data-id = "${obj.id}"]`;
  var targetCard = document.querySelector(dataIdKey);
  obj.tasks.reverse().forEach(function(e) {
      targetCard.childNodes[3].childNodes[1].insertAdjacentHTML('afterbegin', `<li>
            <img class="checkbox ${obj.tasks.indexOf(e)}" src="check-yo-self-icons/checkbox.svg">
            <p class="${obj.tasks.indexOf(e)}">${e.task}</p>
          </li>`);
    })
}

function loadTaskItem(obj) {
  var dataIdKey = `[data-id = "${obj.id}"]`;
  var targetCard = document.querySelector(dataIdKey);
  obj.tasks.forEach(function(e) {
      targetCard.childNodes[3].childNodes[1].insertAdjacentHTML('afterbegin', `<li>
            <img class="checkbox ${obj.tasks.indexOf(e)}" src="check-yo-self-icons/checkbox.svg">
            <p class="${obj.tasks.indexOf(e)}">${e.task}</p>
          </li>`);
    })
}



function pageLoad(e) {
  var getTasks = localStorage.getItem('taskCards');
  var parsedTasks = JSON.parse(getTasks);
  if (parsedTasks !== null) {
    for (var i = 0; i < parsedTasks.length; i++) {
    var task = new ToDoList(parsedTasks[i].id, parsedTasks[i].title, parsedTasks[i].tasks, parsedTasks[i].urgent);
    injectTask(task);
    loadTaskItem(task);
    taskCards.push(task);
    task.saveToStorage();
    }
  }
  clearAll();
}

function targetIndex(e) {
  var targetedCard = e.target.closest(".card");
  var targetedId = parseInt(targetedCard.getAttribute('data-id'))
  var taskIndex = taskCards.findIndex(obj => obj.id === targetedId)
  return taskIndex;
}

function saveLocalCards() {
  var stringifyTasks = JSON.stringify(taskCards);
  localStorage.setItem('taskCards', stringifyTasks);
}

function deleteTaskCard(e) {
  if (e.target.className === 'card-footer__img') {
    var i = targetIndex(e);
    e.target.closest('.card').remove();
    taskCards[i].deleteFromStorage(i);
    saveLocalCards();
  }
}