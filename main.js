const taskTitleInput = document.querySelector('#title-input');
const taskItemInput = document.querySelector('.task-form__inner-input');
const taskForm = document.querySelector('.task-form');
const uTaskList = document.querySelector('ul');
const clearAllBtn = document.querySelector('#clear-btn');
const makeTaskBtn = document.querySelector('#create-card-btn');
const mainElement = document.querySelector('main');
const standbyTasks = [];
const taskCards = [];

taskForm.addEventListener('submit', submitTask);
taskForm.addEventListener('click', removeTask);
makeTaskBtn.addEventListener('click', createTask)
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

function createTask() {
  if (taskTitleInput.value.length < 1 && standbyTasks.length < 1) {
    alert('You must enter a Task Title and create a list of tasks!');
  } else {
    var taskCard = new ToDoList(Date.now(), taskTitleInput.value, standbyTasks);
    taskCards.push(taskCard);
    mainElement.insertAdjacentHTML('afterbegin', `<article class="card" data-id="${taskCard.id}">
      <header class="card-header">${taskCard.title}</header>
      <section class="card-body">
        <ul class="card-body__ul">
        </ul>
      </section>
      <footer class="card-footer">
        <div class="card-footer__img--wrap">
          <img class="card-footer__img" src="check-yo-self-icons/urgent.svg">
          <p class="card-footer__img--text">
            URGENT
          </p>
        </div>
        <div class="card-footer__img--wrap">
          <img class="card-footer__img" src="check-yo-self-icons/delete.svg">
          <p class="card-footer__img--text">
            DELETE
          </p>
        </div>
      </footer>
    </article>` );
    var dataIdKey = `[data-id = "${taskCard.id}"]`;
    var targetCard = document.querySelector(dataIdKey);
    standbyTasks.reverse().forEach(function(e) {
      targetCard.childNodes[3].childNodes[1].insertAdjacentHTML('afterbegin', `<li><input class="checkbox" id="${taskCard.id}" type="checkbox"><label for="${taskCard.id}">${e.task}</label></li>`);
    })
    console.log(taskCards);
  }
}

function targetIndex(e) {
  var targetedCard = e.target.closest(".card");
  var targetedId = parseInt(targetedCard.getAttribute('data-id'))
  var taskIndex = taskCards.findIndex(obj => obj.id === targetedId)
  return taskIndex;
}