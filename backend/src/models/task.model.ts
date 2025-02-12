import User from "./user.model";

class Task {
    id: string;
    name: string;
    dueDate: Date;
    createdBy: User;
    assignedTo: User;
    column: string;
  
    constructor(id: string, name: string, dueDate: Date, createdBy: User, assignedTo: User, column: string) {
      this.id = id;
      this.name = name;
      this.dueDate = dueDate;
      this.column = column;
      this.createdBy = createdBy;
      this.assignedTo = assignedTo;
      
    }
  } export default Task;