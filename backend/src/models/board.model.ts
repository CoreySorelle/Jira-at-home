  import Task from "./task.model";
  import User from "./user.model";

  
  class Board {
    id: string;
    name: string;
    createdBy: User;
    tasks: Task[];
  
    constructor(id: string, name: string, createdBy: User) {
      this.id = id;
      this.name = name;
      this.createdBy = createdBy;
      this.tasks = [];
    }
  
    addTask(task: Task) {
      this.tasks.push(task);
    }
  } export default Board;
  