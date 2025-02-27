"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(id, name, dueDate, column) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.column = column;
    }
}
exports.default = Task;
