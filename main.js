const taskTitleInput = document.querySelector('#title-input');
const taskItemInput = document.querySelector('.task-form__inner-input');
const taskForm = document.querySelector('.task-form');
const uTaskList = document.querySelector('ul');
const clearAllBtn = document.querySelector('#clear-btn');
const makeTaskBtn = document.querySelector('#create-card-btn');
const mainElement = document.querySelector('main');
// const standbyTasks = [];
const taskCards = [];

window.addEventListener('load', pageLoad);
taskForm.addEventListener('submit', submitTaskItem);
taskForm.addEventListener('click', removeTaskItem);
makeTaskBtn.addEventListener('click', createTaskX)
clearAllBtn.addEventListener('click', clearAll);







function submitTaskItem(e) {
  e.preventDefault();
  var randId = Date.now();
  // var taskItem = {
  //   key: randId,
  //   task: taskItemInput.value,
  //   done: false
  // };
  var listItem = `<li class="list-item" id="${randId}"><div class="task-wrap"><img class="delete-btn" src="check-yo-self-icons/delete.svg"><label for="${randId}">${taskItemInput.value}</label></div></li>`;
  if (taskItemInput.value === '') {
    alert('You must enter a task item!')
  } else {
      // standbyTasks.push(taskItem);
      uTaskList.innerHTML += listItem;
      clearTaskInput();
    }
}

function removeTaskItem(e) {
  if (e.target.className === 'delete-btn') {
    // for (var i = 0; i < standbyTasks.length; i++) {
    //   if (standbyTasks[i].key === parseInt(e.target.parentNode.parentNode.id)) {
    //     standbyTasks.splice(i, 1);
    //   }
    // }
    e.target.closest('li').remove();
  }
}

// function createTask() {
//   var standbyTasks = [];
//   var stbyTaskBox = document.querySelectorAll('.list-item');
//   if (taskTitleInput.value.length < 1 && standbyTasks.length < 1) {
//     alert('You must enter a Task Title and create a list of tasks!');
//   } else {
//     var taskCard = new ToDoList(Date.now(), taskTitleInput.value, standbyTasks);
//     taskCards.push(taskCard);
//     injectTask(taskCard);
//     injectTaskItem(taskCard);
//     taskCard.saveToStorage();
//     clearAll();
//   }
// }

function createTaskX() {
  var stbyTasksArr = [];
  var stbyTasks = document.querySelectorAll('.list-item');
  if  (taskTitleInput.value.length < 1 && stbyTasks.length < 1) {
    alert('kek');
  } else {
    for (var i = 0; i < stbyTasks.length; i++) {
      var taskItem = {
        task: document.querySelectorAll('.list-item')[i].childNodes[0].childNodes[1].childNodes[0].data,
        urgent: false
      }
      stbyTasksArr.push(taskItem);
    }
    console.log(stbyTasksArr);
    var taskCard = new ToDoList(Date.now(), taskTitleInput.value, stbyTasksArr);
    taskCards.push(taskCard);
    injectTask(taskCard);
    injectTaskItem(taskCard);
    taskCard.saveToStorage();
    clearAll();
  }
}





function clearAll() {
  document.querySelector('.task-form').reset();
  uTaskList.innerHTML = '';
  // standbyTasks.length = 0;
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
}

function injectTaskItem(obj) {
  var dataIdKey = `[data-id = "${obj.id}"]`;
  var targetCard = document.querySelector(dataIdKey);
  obj.tasks.reverse().forEach(function(e) {
      targetCard.childNodes[3].childNodes[1].insertAdjacentHTML('afterbegin', `<li><input class="checkbox" id="${obj.id}" type="checkbox"><label for="${obj.id}">${e.task}</label></li>`);
    })
}

function loadTaskItem(obj) {
  var dataIdKey = `[data-id = "${obj.id}"]`;
  var targetCard = document.querySelector(dataIdKey);
  obj.tasks.forEach(function(e) {
      targetCard.childNodes[3].childNodes[1].insertAdjacentHTML('afterbegin', `<li><input class="checkbox" id="${obj.id}" type="checkbox"><label for="${obj.id}">${e.task}</label></li>`);
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