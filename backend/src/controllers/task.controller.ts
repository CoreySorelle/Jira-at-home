import { Request, Response } from "express";
import Task from "../models/task.model";

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
      const { id, name, date, column } = req.body;
  
      // Ensure date is converted to a Date object
      const dueDate = new Date(date);
  
      // Validate the date
      if (isNaN(dueDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }
  
      // Corrected Task object instantiation
      var task = new Task(id, name, dueDate, column);
  
      console.log(task.toString());
  
      // Database logic here
  
      res.status(201).json({ message: "Task created successfully", task });
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
