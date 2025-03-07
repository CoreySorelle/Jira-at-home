import express, { Router } from "express";
import { getAllTasks, createTask, updateTaskColumn, sayHello } from "../controllers/task.controller";

const router = express.Router();

router.get("/", sayHello)
router.get("/get-tasks", getAllTasks);
router.post("/create-task", createTask);
router.patch("/update-task", updateTaskColumn);

export default router;
