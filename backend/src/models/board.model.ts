  import Task from "./task.model";
  import User from "./user.model";

  
  class Board {
        id: string;
        name: string;
        description: string;
        createdBy: User;
        createdDate: string;
        tasks: Task[];
  
    constructor(id: string, name: string, desc: string, createdBy: User, createdDate: string) {
        this.id = id;
        this.name = name;
        this.description = desc
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
  