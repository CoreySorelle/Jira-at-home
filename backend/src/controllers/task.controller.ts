import { Request, Response } from "express";
//import { Task } from "../models/task.model";

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    // Database logic to fetch all tasks goes here
    res.json({ message: "Fetching all tasks" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const sayHello = async (req: Request, res: Response) => {
    try {
        res.json({ message: "helloworld" }); // Responds with "helloworld"
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { id, name, dueDate, createdBy, assignedTo, column } = req.body;

    // Database logic to create a new task goes here

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
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
