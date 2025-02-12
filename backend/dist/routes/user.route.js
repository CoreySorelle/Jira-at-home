"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Example route: Get all tasks
router.get("/", (req, res) => {
    res.send("in users");
});
// Export the router so it can be used in `index.ts`
exports.default = router;
