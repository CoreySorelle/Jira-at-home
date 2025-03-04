  import Task from "./task.model";
  import User from "./user.model";

  
  class Board {
        id: string;
        name: string;
        createdBy: User;
        createdDate: Date;
        tasks: Task[];
  
    constructor(id: string, name: string, createdBy: User, createdDate: Date) {
        this.id = id;
        this.name = name;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.tasks = [];
    }
  
    addTask(task: Task) {
        this.tasks.push(task);
    
        for (const task of this.tasks) {
            console.log(task.toString());
        }
    }
  } export default Board;
  