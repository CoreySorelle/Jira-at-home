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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskColumn = exports.createTask = exports.sayHello = exports.getAllTasks = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
// Get all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Database logic 
        res.json({ message: "Fetching all tasks" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAllTasks = getAllTasks;
const sayHello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "helloworld from" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.sayHello = sayHello;
// Create a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, board_id, name, date, column } = req.body;
        // Ensure date is converted to a Date object
        const dueDate = new Date(date);
        // Validate the date
        if (isNaN(dueDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }
        // Corrected Task object instantiation
        var task = new task_model_1.default(id, board_id, name, dueDate, column);
        console.log(task.toString());
        // Database logic here
        res.status(201).json({ message: "Task created successfully", task });
    }
    catch (error) {
        console.error("Error creating task:", error);
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
