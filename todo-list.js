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
  toggleUrgency(e) {
    this.urgent = !this.urgent;
  }
  updateToDo() {
    return 'edited title and urgency';
  }
  updateTask(state) {
    this.done = state;
  }
}