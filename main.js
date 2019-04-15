const taskTitleInput = document.querySelector('#title-input');
const taskItemInput = document.querySelector('.task-form__inner-input');
const taskForm = document.querySelector('.task-form');
const uTaskList = document.querySelector('ul');
const clearAllBtn = document.querySelector('#clear-btn');
const makeTaskBtn = document.querySelector('#create-card-btn');
const mainElement = document.querySelector('main');
const cardTasks = document.querySelector('.card-body__ul');
var standbyTasks = [];
var taskCards = [];

window.addEventListener('load', pageLoad);
taskForm.addEventListener('submit', addTaskItem);
taskForm.addEventListener('click', removeTaskItem);
taskForm.addEventListener('click', createToDoList)
clearAllBtn.addEventListener('click', clearAll);
mainElement.addEventListener('click', deleteTaskCard);
// mainElement.addEventListener('click', checkOff)


function addTaskItem(e) {
  e.preventDefault();
  if (taskItemInput.value === '') {
    alert('You must enter a task item!');
  } else {
    var taskItem = {
      text: taskItemInput.value,
      done: false
    };
    standbyTasks.push(taskItem);
    populateTaskList(standbyTasks, uTaskList)
    clearTaskInput();
  }
}

function populateTaskList(tasksArray, taskList) {
  uTaskList.innerHTML = tasksArray.map((task, i) => {
    return `
    <li>
    <input class="delete-btn" type="button" data-index=${i} id="task${i}"/>
    <label class="li__label" for="task${i}">${task.text}</label>
    </li>`;
  }).join('');
}

// function stageTaskList() {
//   var standbyTasks = [];
//   var listItems = document.querySelectorAll('li__label');
//   listItems.forEach(function(e) {
//     var taskItem = {
//       text: e.textContent,
//       done: false
//     };
//     standbyTasks.push(taskItem);
//   })
//   return standbyTasks;
// }

function createToDoList(e) {
  if (e.target.id === 'create-card-btn') {
    var card = new ToDoList(Date.now(), taskTitleInput.value, standbyTasks);
    taskCards.push(card);
    createCard(card);
    injectTaskList(standbyTasks, card);
    card.saveToStorage();
    clearAll();
    standbyTasks = [];
  }
}

function createCard(obj) {
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

function injectTaskList(tasksArray, obj) {
  var dataIdKey = `[data-id = "${obj.id}"]`;
  var targetCard = document.querySelector(dataIdKey);
  targetCard.childNodes[3].childNodes[1].innerHTML = tasksArray.map((task, i) => {
    return `
    <li>
    <input type="checkbox" data-index=${i} id="task${i}" ${task.done ? 'checked' : ''}/>
    <label for="task${i}">${task.text}</label>
    </li>`;
  }).join('');
}



function clearAll() {
  taskForm.reset();
  uTaskList.innerHTML = '';
}

function clearTaskInput() {
  taskItemInput.value = '';
}

function removeTaskItem(e) {
  var taskCounter = document.querySelectorAll('.delete-btn');
  for (var i = 0; i < taskCounter.length; i++) {
    if (e.target === taskCounter[i]) {
      standbyTasks.splice(i, 1);
    }
  }
  if (e.target.className === 'delete-btn') {
    e.target.closest('li').remove();
  }
}

// function pageLoad(e) {
//   var getCards = localStorage.getItem('taskCards');
//   var parsedCards = JSON.parse(getCards);
//   if (parsedCards !== null) {
//     parsedCards.forEach(function(e) {
//       var card = new ToDoList(e.id, e.title, e.tasks, e.urgent);
//       taskCards.push(e);
//       createCard(e);
//       injectTaskList(e.tasks, e);
//       card.saveToStorage();
//     })
//   }
//   clearAll();
// }

function pageLoad(e) {
  var getCards = localStorage.getItem('taskCards');
  var parsedCards = JSON.parse(getCards);
  if (parsedCards !== null) {
    for (var i = 0; i < parsedCards.length; i++) {
      var card = new ToDoList(parsedCards[i].id, parsedCards[i].title, parsedCards[i].tasks, parsedCards.urgent);
      taskCards.push(card);
      createCard(parsedCards[i]);
      injectTaskList(parsedCards[i].tasks, parsedCards[i]);
      card.saveToStorage();
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