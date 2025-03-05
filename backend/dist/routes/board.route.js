"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const board_controller_1 = require("../controllers/board.controller");
const router = express_1.default.Router();
router.get("/", board_controller_1.getBoard);
router.post("/", board_controller_1.postBoard);
router.get("/tasks", board_controller_1.getTasks);
router.get("/boards-by-user", board_controller_1.getBoardsByUser);
exports.default = router;
