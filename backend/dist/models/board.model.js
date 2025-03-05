"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Board {
    constructor(id, name, desc, createdBy, createdDate) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
        for (const task of this.tasks) {
            console.log(task.toString());
        }
    }
}
exports.default = Board;
