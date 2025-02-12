"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskColumn = exports.createTask = exports.sayHello = exports.getAllTasks = void 0;
//import { Task } from "../models/task.model";
// Get all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Database logic to fetch all tasks goes here
        res.json({ message: "Fetching all tasks" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAllTasks = getAllTasks;
const sayHello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "helloworld" }); // Responds with "helloworld"
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.sayHello = sayHello;
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, dueDate, createdBy, assignedTo, column } = req.body;
        // Database logic to create a new task goes here
        res.status(201).json({ message: "Task created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createTask = createTask;
// Update a task's column
const updateTaskColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, column } = req.body;
        // Database logic to update task column goes here
        res.json({ message: `Task ${taskId} moved to ${column}` });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateTaskColumn = updateTaskColumn;
