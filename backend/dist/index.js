"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Import CORS middleware
const task_route_1 = __importDefault(require("./routes/task.route"));
const board_route_1 = __importDefault(require("./routes/board.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// Enable CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:3000", // Allow frontend
    methods: "GET,POST,PUT,DELETE,PATCH", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
}));
// Middleware to parse JSON
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
// Routes
app.use("/task", task_route_1.default);
app.use("/user", user_route_1.default);
app.use("/board", board_route_1.default);
// Start server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
