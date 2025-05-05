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
exports.login = exports.sayHello = exports.createAccount = exports.getUser = exports.getUserName = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../utils/db");
const user_model_1 = __importDefault(require("../models/user.model"));
const secretKey_1 = require("../utils/secretKey");
const getUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryResult = yield db_1.pool.query("SELECT fname, lname FROM Users WHERE email = $1", [req.body.id]);
        if (!queryResult.rows || queryResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const username = queryResult.rows[0].fname + " " + queryResult.rows[0].lname;
        console.log("user sent");
        res.status(200).json(username);
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});
exports.getUserName = getUserName;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey_1.SECRET_KEY);
        const queryResult = yield db_1.pool.query("SELECT * FROM Users WHERE email = $1", [decoded.email]);
        if (!queryResult.rows || queryResult.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const userData = queryResult.rows[0];
        const user = new user_model_1.default(userData.id, userData.fname, userData.lname, userData.email, "I will never send my id back to the frontend", userData.dob, userData.street, userData.city, userData.zip, userData.state);
        console.log("user sent");
        res.status(200).json(user);
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});
exports.getUser = getUser;
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fname, lname, email, password, dob, street, city, zip, state } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_model_1.default(crypto.randomUUID(), fname, lname, email, hashedPassword, new Date(dob), street, city, zip, state);
        const queryResult = yield db_1.pool.query(`INSERT INTO Users (fname, lname, email, password, dob, street, city, zip, state) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`, [
            newUser.fname,
            newUser.lname,
            newUser.email,
            newUser.password,
            newUser.dob,
            newUser.street,
            newUser.city,
            newUser.zip,
            newUser.state
        ]);
        console.log("account created");
        res.status(201).json({ message: "Account created successfully", user: newUser });
    }
    catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createAccount = createAccount;
const sayHello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "helloworld from user" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.sayHello = sayHello;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers["authorization"]) {
            let userInfo = req.headers["authorization"].split(" ")[1]; // Base 64 Encoded
            let decodedUserInfo = atob(userInfo);
            let email = decodedUserInfo.split(":")[0];
            let password = decodedUserInfo.split(":")[1];
            let queryResult = yield db_1.pool.query("SELECT * FROM users WHERE email = $1", [email]);
            if (queryResult.rows.length > 0) {
                let user = queryResult.rows[0];
                bcrypt_1.default.compare(password, user.password.trim(), (err, result) => {
                    if (result) {
                        let token = jsonwebtoken_1.default.sign({
                            email: user.email,
                            id: user.id
                        }, secretKey_1.SECRET_KEY);
                        console.log("logged in");
                        res.status(200).send({
                            token: token,
                        });
                    }
                    else {
                        res.status(401).send({
                            status: 401,
                            message: "Incorrect password",
                        });
                    }
                });
            }
            else {
                res.status(401).send({
                    message: "No account with that email found",
                });
            }
        }
        else {
            res.status(401).send({ message: "missing required login details" });
        }
    }
    catch (e) {
        console.error("Error in login route:", e); // Log the error
        res.status(500).send({ message: "Internal Server Error", error: e });
    }
});
exports.login = login;
