import express from "express";
import { sayHello, createAccount, login, getUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/", sayHello);
router.get("/get-user", getUser);
router.post("/create-account", createAccount);
router.post("/login", login);


export default router;