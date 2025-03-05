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
exports.postBoard = exports.getTasks = exports.getBoardsByUser = exports.getBoard = exports.sayHello = void 0;
const pg_1 = require("pg");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const board_model_1 = __importDefault(require("../models/board.model"));
const SECRET_KEY = "0fb5f53f4d7ae5114979d94d01ddf11bf7e11d30dadf025732642995194fdf5fa0e62d5f726de0315e09c780319f98e512dc3c3a6c0ea8c847e7f1e76885bcd0";
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PGSSLMODE === "disable" ? false : undefined, // Only set SSL if not disabled
});
const sayHello = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "helloworld from board" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.sayHello = sayHello;
const getBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "helloworld from board" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getBoard = getBoard;
const getBoardsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const queryBoardids = yield pool.query("SELECT board_id FROM Board_Users WHERE user_id = $1", [decoded.id]);
        let boards = [];
        for (let i = 0; i < queryBoardids.rows.length; i++) {
            const id = queryBoardids.rows[i].board_id; // Only get the board_id string
            // Query the DB for each board
            const queryBoard = yield pool.query("SELECT * FROM Boards WHERE id = $1", [id]);
            if (queryBoard.rows.length > 0) {
                const boardData = queryBoard.rows[0];
                const board = new board_model_1.default(boardData.id, boardData.name, boardData.description, boardData.owner_id, boardData.created_at);
                boards.push(board);
            }
        }
        //return board
        res.status(200).json(boards);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getBoardsByUser = getBoardsByUser;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "helloworld from board" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getTasks = getTasks;
const postBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("check 1");
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        let name = req.body.name;
        let desc = req.body.desc;
        let id = decoded.id;
        const queryResult = yield pool.query(`INSERT INTO Boards (name, description, owner_id) 
             VALUES ($1, $2, $3) 
             RETURNING *`, [
            name,
            desc,
            id
        ]);
        const newBoard = queryResult.rows[0];
        const boardId = newBoard.id;
        //query to insert new Board_Users
        const queryBoard_Users = yield pool.query(`INSERT INTO Board_Users (board_id, user_id, role) 
             VALUES ($1, $2, $3) 
             RETURNING *`, [
            boardId,
            id,
            'admin'
        ]);
        res.status(201).json({ message: "Board and Board_users created" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.postBoard = postBoard;
