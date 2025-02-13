"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(id, name, dueDate, column) {
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
exports.default = Task;
