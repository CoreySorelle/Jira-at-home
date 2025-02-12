import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/task.route"; 
import boardRoutes from "./routes/board.route";
import userRoutes from "./routes/user.route";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON requests

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Use the task routes under `/tasks`
app.use("/task", taskRoutes);
app.use("/user", userRoutes);
app.use("/board", boardRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
