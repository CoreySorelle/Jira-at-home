"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(id, name, dueDate, createdBy, assignedTo, column) {
        this.id = id;
        this.name = name;
        this.dueDate = dueDate;
        this.column = column;
        this.createdBy = createdBy;
        this.assignedTo = assignedTo;
    }
}
exports.default = Task;
