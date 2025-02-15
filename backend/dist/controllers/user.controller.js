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
exports.sayHello = exports.login = exports.createAccount = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pg_1 = require("pg");
const user_model_1 = __importDefault(require("../models/user.model"));
const SECRET_KEY = "0fb5f53f4d7ae5114979d94d01ddf11bf7e11d30dadf025732642995194fdf5fa0e62d5f726de0315e09c780319f98e512dc3c3a6c0ea8c847e7f1e76885bcd0";
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
let users = [];
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const userObject = users.find((u) => u.email === decoded.email);
        if (!userObject) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ fname: userObject.fname, lname: userObject.lname });
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
});
exports.getUser = getUser;
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fname, lname, email, password, dob, street, city, zip, state } = req.body;
        // Hash password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create a new User instance
        const newUser = new user_model_1.default(crypto.randomUUID(), // Generate a unique ID
        fname, lname, email, hashedPassword, // Store hashed password
        new Date(dob), // Ensure DOB is stored as a Date object
        street, city, zip, state);
        users.push(newUser); // Add to users array
        res.status(201).json({ message: "Account created successfully", user: newUser });
    }
    catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createAccount = createAccount;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers["authorization"]) {
            let userInfo = req.headers["authorization"].split(" ")[1]; // Base64 Encoded
            let decodedUserInfo = Buffer.from(userInfo, "base64").toString();
            let [email, password] = decodedUserInfo.split(":");
            //console.log(email, password, decodedUserInfo, userInfo);
            let user = users.find((u) => u.email === email);
            if (user) {
                const match = yield bcrypt_1.default.compare(password, user.password);
                if (match) {
                    let token = jsonwebtoken_1.default.sign({ email: user.email }, SECRET_KEY);
                    console.log("Generated Token:", token);
                    res.status(200).send({ token: token });
                }
                else {
                    res.status(401).send({ status: 401, message: "Incorrect password" });
                }
            }
            else {
                res.status(401).send({ message: "No account with that email found" });
            }
        }
        else {
            res.status(401).send({ message: "Missing required login details" });
        }
    }
    catch (e) {
        console.error("Error in login route:", e);
        res.status(500).send({ message: "Internal Server Error", error: e });
    }
});
exports.login = login;
const sayHello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "helloworld from user" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.sayHello = sayHello;
/*export const login = async (req: Request, res: Response) => {
    try {
        //write some logic here
        if (req.headers["authorization"]) {
            let userInfo = req.headers["authorization"].split(" ")[1]; //Base 64 Encoded
            let decodedUserInfo = atob(userInfo);
            let email = decodedUserInfo.split(":")[0];
            let password = decodedUserInfo.split(":")[1];
            console.log(email, password, decodedUserInfo, userInfo);
            /*let queryResult = await pool.query(
                "SELECT * FROM User WHERE email = $1",
                [email]
            );

            if (queryResult.rows.length > 0) {
                let user = queryResult.rows[0];
                bcrypt.compare(
                    password,
                    user.password.trim(),
                    (err: any, result: any) => {
                        console.log({
                            password,
                            storedHash: user.password.trim(),
                            err,
                            result,
                        });
                        if (result) {
                            let token = jwt.sign(
                                {
                                    email: user.email,
                                },
                                SECRET_KEY
                            );
                            res.status(200).send({
                                token: token,
                            });
                        } else {
                            res.status(401).send({
                                status: 401,
                                message: "Incorrect password",
                            });
                        }
                    }
                );
            } else {
                res.status(401).send({
                    message: "No account with that email found",
                });
            }
        } else {
            res.status(401).send({ message: "missing required login details" });
        }
    } catch (e) {
        console.error("Error in login route:", e); // Log the error
        res.status(500).send({ message: "Internal Server Error", error: e });
    }
}*/ 
