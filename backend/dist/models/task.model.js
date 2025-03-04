"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(id, board_id, name, createdDate, column) {
        this.id = id;
        this.board_id = board_id;
        this.name = name;
        this.createdDate = createdDate;
        this.column = column;
    }
}
exports.default = Task;
