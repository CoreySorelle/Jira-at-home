import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

// Example route: Get all tasks
router.get("/", (req: Request, res: Response) => {
    res.send("in boards");
});

// Export the router so it can be used in `index.ts`
export default router;