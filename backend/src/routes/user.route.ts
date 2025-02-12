import express from "express";
import { sayHello } from "../controllers/user.controller";

const router = express.Router();

router.get("/", sayHello)


export default router;