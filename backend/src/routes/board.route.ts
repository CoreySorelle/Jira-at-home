import express from "express";
import { getBoard, getTasks, postBoard, sayHello } from "../controllers/board.controller";

const router = express.Router();

router.get("/", getBoard);
router.post("/", postBoard);
router.get("/tasks", getTasks);


export default router;