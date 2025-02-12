import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

// Example route: Get all tasks
router.get("/", (req: Request, res: Response) => {
    res.send("in tasks");
});

// Example route: Create a new task
router.post("/", (req: Request, res: Response) => {
  res.json({ message: "Creating a new task" });
});

// Export the router so it can be used in `index.ts`
export default router;
