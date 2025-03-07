import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS middleware
import taskRoutes from "./routes/task.route"; 
import boardRoutes from "./routes/board.route";
import userRoutes from "./routes/user.route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Enable CORS
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend
  methods: "GET,POST,PUT,DELETE,PATCH", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
}));

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Routes
app.use("/task", taskRoutes);
app.use("/user", userRoutes);
app.use("/board", boardRoutes);

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
