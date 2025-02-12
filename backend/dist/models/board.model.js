"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Board {
    constructor(id, name, createdBy) {
        this.id = id;
        this.name = name;
        this.createdBy = createdBy;
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
    }
}
exports.default = Board;
