import express from "express";
import { sayHello, createAccount, login } from "../controllers/user.controller";

const router = express.Router();

router.get("/", sayHello);
router.post("/create-account", createAccount);
router.post("/login", login);


export default router;