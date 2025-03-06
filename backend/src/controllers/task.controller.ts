import { Request, Response } from "express";
import Task from "../models/task.model";
import { Pool } from "pg";

const SECRET_KEY =
  "0fb5f53f4d7ae5114979d94d01ddf11bf7e11d30dadf025732642995194fdf5fa0e62d5f726de0315e09c780319f98e512dc3c3a6c0ea8c847e7f1e76885bcd0";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === "disable" ? false : undefined, // Only set SSL if not disabled
});

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    // Database logic 
    res.json({ message: "Fetching all tasks" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const sayHello = async (req: Request, res: Response) => {
    try {
        res.json({ message: "helloworld from" }); 
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
    try {
      const { board_id, name, column } = req.body;
  

      // Database logic here
      const queryResult = await pool.query(
        `INSERT INTO Tasks (board_id, title, status) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
        [
          board_id,
          name,
          column
        ]
    );
  
    res.status(201).json({
      message: "Task created successfully",
      task: queryResult.rows[0], 
    });

    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Update a task's column
export const updateTaskColumn = async (req: Request, res: Response) => {
  try {
    const { taskId, column } = req.body;

    // Database logic to update task column goes here

    res.json({ message: `Task ${taskId} moved to ${column}` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
