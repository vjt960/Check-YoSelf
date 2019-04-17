const taskTitleInput = document.querySelector('#title-input');
const taskItemInput = document.querySelector('#item-input');
const taskForm = document.querySelector('.form--task-form');
const uTaskList = document.querySelector('ul');
const clearAllBtn = document.querySelector('#clear-btn');
const makeTaskBtn = document.querySelector('#create-card-btn');
const mainElement = document.querySelector('main');
const cardTasks = document.querySelector('.card-body__ul');
const taskFormInputs = document.querySelectorAll('.task-form--textarea');
const taskSubmitBtn = document.querySelector('#task-submit-btn');
const searchBar = document.querySelector('.search__input');
const urgentFilterBtn = document.querySelector('#urgency-filter-btn');
var greetingText = document.querySelector('.main__h2--greeting');
var taskCards = [];

//<--------------Event Listers------------------->

window.addEventListener('load', pageLoad);
taskForm.addEventListener('submit', addTaskItem);
taskForm.addEventListener('click', removeTaskItem);
taskForm.addEventListener('click', stageTaskList)
urgentFilterBtn.addEventListener('click', toggleUrgentFilter);
clearAllBtn.addEventListener('click', clearAll);
mainElement.addEventListener('click', deleteTaskCard);
mainElement.addEventListener('click', checkoffTask);
mainElement.addEventListener('click', toggleUrgent);
searchBar.addEventListener('keyup', runSearchFilter);

//<----------------------------------------------------->

function targetIndex(e) {
  var targetedCard = e.target.closest(".card");
  var targetedId = parseInt(targetedCard.getAttribute('data-id'))
  var taskIndex = taskCards.findIndex(obj => obj.id === targetedId)
  return taskIndex;
}

function greetUser() {
  var elements = document.querySelectorAll('article');
  if (!elements.length) {
    greetingText.removeAttribute('hidden', true)
  } else if (elements.length) {
    greetingText.setAttribute('hidden', true)
  }
};

//<-----------------Task / Card Creation---------------->

function addTaskItem(e) {
  e.preventDefault();
  var taskCounter = document.querySelectorAll('.delete-btn');
  var i = taskCounter.length;
  uTaskList.insertAdjacentHTML('beforeend',
    `<li>
    <input class="delete-btn" type="button" data-index=${i} id="task${i}"/>
    <label class="li__label" for="task${i}">${taskItemInput.value}</label>
    </li>`);
  clearTaskInput();
}

function stageTaskList(e) {
  var taskCounter = document.querySelectorAll('.delete-btn');
  console.log(taskTitleInput.value.length);
  if (e.target.className === 'task-form__btn' && taskTitleInput.value.length > 0) {
    var standbyTasks = [];
    var listItems = document.querySelectorAll('.li__label');
    listItems.forEach(function(task) {
      var taskItem = {
        text: task.textContent,
        done: false
      };
      standbyTasks.push(taskItem);
    })
    createToDoList(standbyTasks)
  } else if ((e.target.id === 'create-card-btn') && (taskTitleInput.value.length < 1 || taskCounter.length < 1)) {
    return;
  }
}

function createToDoList(stagedTasks) {
  var taskCounter = document.querySelectorAll('.delete-btn');
  var card = new ToDoList(Date.now(), taskTitleInput.value, stagedTasks);
  taskCards.push(card);
  createCard(card);
  injectTaskList(stagedTasks, card);
  card.saveToStorage();
  greetUser();
  clearAll();
}

function createCard(obj) {
  mainElement.insertAdjacentHTML('afterbegin', `<article class="card card-${obj.urgent}" data-id="${obj.id}">
      <header class="card-header card-header-${obj.urgent}"><h3>${obj.title}</h3></header>
      <section class="card-body card-body-${obj.urgent}">
        <ul class="card-body__ul">
        </ul>
      </section>
      <footer class="card-footer">
        <div class="card-footer__img--wrap urgent__img">
          <img class="card-footer__img" id="urgent-icon" src=${obj.urgentImg}>
          <p class="footer--text footer-${obj.urgent}--text">
            URGENT
          </p>
        </div>
        <div class="card-footer__img--wrap delete__img">
          <img class="card-footer__img" id="delete-icon" src="check-yo-self-icons/delete.svg">
          <p class="card-footer__img--text">
            DELETE
          </p>
        </div>
      </footer>
    </article>`);
}

function injectTaskList(tasksArray, obj) {
  var dataIdKey = `[data-id = "${obj.id}"]`;
  var targetCard = document.querySelector(dataIdKey);
  targetCard.childNodes[3].childNodes[1].innerHTML = tasksArray.map((task, i) => {
    return `
    <li class="list list-${task.done}">
    <input class="checkbox input-${task.done}" type="checkbox" data-index=${i} id="${i}task${Date.now()}" ${task.done ? 'checked' : ''}/>
    <label class="task-label label-${task.done}" for="${i}task${Date.now()}">${task.text}</label>
    </li>`;
  }).join('');
}

//<---------------------- Save / Clear / Reload ---------------------------->

function saveLocalCards() {
  var stringifyTasks = JSON.stringify(taskCards);
  localStorage.setItem('taskCards', stringifyTasks);
}

function clearAll() {
  taskForm.reset();
  uTaskList.innerHTML = '';
}

function clearTaskInput() {
  taskItemInput.value = '';
}

function removeTaskItem(e) {
  if (e.target.className === 'delete-btn') {
    e.target.closest('li').remove();
  }
}

function pageLoad(e) {
  var getCards = localStorage.getItem('taskCards');
  var parsedCards = JSON.parse(getCards);
  if (parsedCards !== null) {
    for (var i = 0; i < parsedCards.length; i++) {
      var card = new ToDoList(parsedCards[i].id, parsedCards[i].title, parsedCards[i].tasks, parsedCards[i].urgent, parsedCards[i].urgentImg);
      taskCards.push(card);
      createCard(card);
      injectTaskList(card.tasks, card);
    }
  }
  greetUser();
  clearAll();
}

//<---------------------- Task Management ------------------------------------------>

function checkoffTask(e) {
  if (!e.target.matches('input')) return;
  var el = e.target;
  var i = el.dataset.index;
  var cardIndex = targetIndex(e);
  taskCards[cardIndex].tasks[i].done = !taskCards[cardIndex].tasks[i].done;
  crossOut(e);
  saveLocalCards();
}

function crossOut(e) {
  var i = targetIndex(e);
  var taskList = e.target.closest('article').children[1].children[0];
  taskCards[i].tasks.map((task, index) => {
    if (task.done) {
      taskList.children[index].className = `list list-${task.done}`;
    } else {
      taskList.children[index].className = `list list-${task.done}`;
    }
  })
}

function toggleUrgent(e) {
  if (e.target.id !== 'urgent-icon') return;
  var i = targetIndex(e);
  taskCards[i].toggleUrgency(e);
  triggerHighlight(e);
  taskCards[i].saveToStorage();
}

function triggerHighlight(e) {
  var i = targetIndex(e);
  var obj = taskCards[i];
  var group = e.target.closest('.card');
  group.className = `card card-${obj.urgent}`;
  group.childNodes[1].className = `card-header card-header-${obj.urgent}`;
  group.childNodes[3].className = `card-body card-body-${obj.urgent}`;
  group.childNodes[5].childNodes[1].childNodes[3].className = `footer--text footer-${obj.urgent}--text`;
  group.childNodes[5].childNodes[1].childNodes[1].src = `${obj.urgentImg}`;
}

function deleteTaskCard(e) {
  if (e.target.id !== 'delete-icon') return;
  var i = targetIndex(e);
  var counter = taskCards[i].tasks.filter(task => task.done);
  counter.length === taskCards[i].tasks.length ? taskCards[i].updateTask(true) : taskCards[i].updateTask(false);
  if (taskCards[i].done) {
    e.target.closest('.card').remove();
    taskCards[i].deleteFromStorage(i);
    greetUser();
    saveLocalCards();
  } else {
    alert('You must complete each task before you can delete a card!');
  }
}

function runSearchFilter(e) {
  taskCards.map((obj, i) => {
    var dataIdKey = `[data-id = "${obj.id}"]`;
    var targetCard = document.querySelector(dataIdKey);
    targetCard.style.display = obj.title.toLowerCase().includes(searchBar.value.toLowerCase()) ? 'block' : 'none';
  })
}

//<----------------------- Page Filters --------------------------->

function toggleUrgentFilter() {
  for (var i = 0; i < taskCards.length; i++) {
    var dataIdKey = `[data-id = "${taskCards[i].id}"]`;
    var targetCard = document.querySelector(dataIdKey);
    if (targetCard.style.display === 'none') {
      console.log('supposed to displayAll');
      displayAllCards();
      urgentFilterBtn.className = `task-form--urgency-btn task-form__btn`;
      return;
    }
  }
  taskCards.map((obj, index) => {
    var dataIdKey = `[data-id = "${obj.id}"]`;
    var targetCard = document.querySelector(dataIdKey);
    targetCard.style.display = obj.urgent ? 'block' : 'none';
  })
  urgentFilterBtn.className = `task-form--urgency-btn urgentOn task-form__btn`;
}

function displayAllCards() {
  taskCards.map((obj, i) => {
    var dataIdKey = `[data-id = "${obj.id}"]`;
    var targetCard = document.querySelector(dataIdKey);
    console.log('display all');
    targetCard.style.display = 'block';
  })
}