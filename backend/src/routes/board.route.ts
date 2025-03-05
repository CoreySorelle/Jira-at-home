import express from "express";
import { getBoard, getBoardsByUser, getTasks, postBoard, sayHello } from "../controllers/board.controller";

const router = express.Router();

router.get("/", getBoard);
router.post("/", postBoard);
router.get("/tasks", getTasks);
router.get("/boards-by-user", getBoardsByUser);


export default router;