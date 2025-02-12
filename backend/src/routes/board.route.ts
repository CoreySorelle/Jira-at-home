import express from "express";
import { sayHello } from "../controllers/board.controller";

const router = express.Router();

router.get("/", sayHello)


export default router;