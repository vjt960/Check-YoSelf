class ToDoList {
  constructor(id, title, tasks, urgent, urgentImg) {
    this.id = id;
    this.title = title;
    this.tasks = tasks
    this.urgent = urgent || false;
    this.done = false;
    this.urgentImg = urgentImg || 'check-yo-self-icons/urgent.svg';
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
    this.urgentImg = !this.urgent ? 'check-yo-self-icons/urgent.svg' : 'check-yo-self-icons/urgent-active.svg';
  }
  updateToDo() {
    return 'edited title and urgency';
  }
  updateTask(state) {
    this.done = state;
  }
}