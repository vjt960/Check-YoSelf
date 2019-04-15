class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks
    this.urgent = urgent || false;
    this.done = false;
  }

  saveToStorage() {
    var stringifyTasks = JSON.stringify(taskCards);
    localStorage.setItem('taskCards', stringifyTasks);
  }
  
  deleteFromStorage(index) {
    taskCards.splice(index, 1);
  }

  toggleUrgency() {
    this.urgent = !this.urgent;
  }

  toggleDone(state) {
    this.done = state;
  }

  updateToDo() {
    return 'edited title and urgency';
  }

  updateTask() {
    return 'edited task';
  }
}