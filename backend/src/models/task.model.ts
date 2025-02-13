import User from "./user.model";

class Task {
    id: string;
    name: string;
    dueDate: Date;
    column: string;
  
    constructor(id: string, name: string, dueDate: Date, column: string) {
      this.id = id;
      this.name = name;
      this.dueDate = dueDate;
      this.column = column;
    }

    toString() {
        return `Task ID: ${this.id}
Task Name: ${this.name}
Due Date: ${this.dueDate.toISOString()}
Column: ${this.column}`;
    }
}

export default Task;
