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
const pg_1 = require("pg");
const SECRET_KEY = "0fb5f53f4d7ae5114979d94d01ddf11bf7e11d30dadf025732642995194fdf5fa0e62d5f726de0315e09c780319f98e512dc3c3a6c0ea8c847e7f1e76885bcd0";
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE === "disable" ? false : undefined, // Only set SSL if not disabled
});
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
        const { board_id, name, column } = req.body;
        // Database logic here
        const queryResult = yield pool.query(`INSERT INTO Tasks (board_id, title, status) 
         VALUES ($1, $2, $3) 
         RETURNING *`, [
            board_id,
            name,
            column
        ]);
        res.status(201).json({
            message: "Task created successfully",
            task: queryResult.rows[0],
        });
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
