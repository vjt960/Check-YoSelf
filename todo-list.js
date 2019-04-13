class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
    this.urgent = urgent || false;
  }
  saveToStorage() {
    return 'saved to local';
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