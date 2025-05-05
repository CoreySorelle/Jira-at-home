import { Request, Response } from "express";
import Task from "../models/task.model";
import { pool } from "../utils/db";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/secretKey";

import dotenv from 'dotenv';
dotenv.config();

// Get all tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {

    //console.log("check 1");
    // Database logic 
    const queryResult = await pool.query(
      "SELECT * FROM Tasks WHERE board_id = $1",
      [req.query.boardId]
    );

    let tasks = queryResult.rows;

    for(let i = 0; i < queryResult.rows.length; i++){
      try{

        const queryUser = await pool.query(
          "SELECT fname, lname FROM Users WHERE id = $1",
          [tasks[i].created_by]
        );

        tasks[i].username = queryUser.rows[0].fname + " " + queryUser.rows[0].lname;

      } catch(error){

      }
    }

    //console.log(queryResult.rows);
    

    res.status(200).json({ 
      message: "Fetching all tasks",
      tasks: tasks
     });

     

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
  
      const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
              
      if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
      }
  
      const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

      const queryUser = await pool.query(
        `SELECT fname, lname FROM Users WHERE id = $1`,
        [decoded.id]
      );

      let username = queryUser.rows[0].fname + " " + queryUser.rows[0].lname;

      // Database logic here
      const queryResult = await pool.query(
        `INSERT INTO Tasks (board_id, title, status, created_by) 
         VALUES ($1, $2, $3, $4) 
         RETURNING *`,
        [
          board_id,
          name,
          column,
          decoded.id
        ]
    );

    let task = queryResult.rows[0];
    task.username = username;
  
    res.status(201).json({
      message: "Task created successfully",
      task: task,
    });

    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

// Update a task's column
export const updateTaskColumn = async (req: Request, res: Response) => {

  //console.log("check 1");

  try {
    const { taskId, target } = req.body;

    console.log("req.body of updateTaskColumn: " + taskId + " " + target);

    // Database logic to update task column goes here
    try {
      const query = `
        UPDATE Tasks 
        SET status = $1 
        WHERE id = $2
        RETURNING *;
      `;
      const result = await pool.query(query, [target, taskId]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task updated", task: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
