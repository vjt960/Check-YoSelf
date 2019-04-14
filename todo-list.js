class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks
    this.urgent = urgent || false;
  }
  saveToStorage() {
    var stringifyTasks = JSON.stringify(taskCards);
    localStorage.setItem('taskCards', stringifyTasks);
  }

  deleteFromStorage() {
    return 'removed from local';
  }

  updateToDo() {
    return 'edited title and urgency';
  }

  updateTask() {
    return 'edited task';
  }
}