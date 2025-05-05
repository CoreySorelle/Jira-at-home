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
const db_1 = require("../utils/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey_1 = require("../utils/secretKey");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Get all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log("check 1");
        // Database logic 
        const queryResult = yield db_1.pool.query("SELECT * FROM Tasks WHERE board_id = $1", [req.query.boardId]);
        let tasks = queryResult.rows;
        for (let i = 0; i < queryResult.rows.length; i++) {
            try {
                const queryUser = yield db_1.pool.query("SELECT fname, lname FROM Users WHERE id = $1", [tasks[i].created_by]);
                tasks[i].username = queryUser.rows[0].fname + " " + queryUser.rows[0].lname;
            }
            catch (error) {
            }
        }
        //console.log(queryResult.rows);
        res.status(200).json({
            message: "Fetching all tasks",
            tasks: tasks
        });
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
    var _a;
    try {
        const { board_id, name, column } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey_1.SECRET_KEY);
        const queryUser = yield db_1.pool.query(`SELECT fname, lname FROM Users WHERE id = $1`, [decoded.id]);
        let username = queryUser.rows[0].fname + " " + queryUser.rows[0].lname;
        // Database logic here
        const queryResult = yield db_1.pool.query(`INSERT INTO Tasks (board_id, title, status, created_by) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`, [
            board_id,
            name,
            column,
            decoded.id
        ]);
        let task = queryResult.rows[0];
        task.username = username;
        res.status(201).json({
            message: "Task created successfully",
            task: task,
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
    //console.log("check 1");
    try {
        const { taskId, target } = req.body;
        console.log("req.body of updateTaskColumn: " + taskId + " " + target);
        // Database logic to update task column goes here
        try {
            const query = `
        UPDATE Tasks 
        SET status = $1 
        WHERE id = $2
        RETURNING *;
      `;
            const result = yield db_1.pool.query(query, [target, taskId]);
            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ message: "Task updated", task: result.rows[0] });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateTaskColumn = updateTaskColumn;
