"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const router = express_1.default.Router();
router.get("/", task_controller_1.sayHello);
router.get("/get-tasks", task_controller_1.getAllTasks);
router.post("/create-task", task_controller_1.createTask);
router.patch("/update-task", task_controller_1.updateTaskColumn);
exports.default = router;
