import Board from "./board.model";

class Task {
    id: string;
    board_id: string;
    name: string;
    createdDate: Date;
    column: string;
    
  
    constructor(id: string, board_id: string, name: string, createdDate: Date, column: string) {
      this.id = id;
      this.board_id = board_id;
      this.name = name;
      this.createdDate = createdDate;
      this.column = column;
    }

}

export default Task;
