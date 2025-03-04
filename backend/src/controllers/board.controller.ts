import { Request, Response } from "express";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Board from "../models/board.model";


const SECRET_KEY =
  "0fb5f53f4d7ae5114979d94d01ddf11bf7e11d30dadf025732642995194fdf5fa0e62d5f726de0315e09c780319f98e512dc3c3a6c0ea8c847e7f1e76885bcd0";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE === "disable" ? false : undefined, // Only set SSL if not disabled
});

export const sayHello = async (req: Request, res: Response) => {
    try {
        res.json({ message: "helloworld from board" }); 
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getBoard = async (req: Request, res: Response) => {
    try {


        res.json({ message: "helloworld from board" }); 
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {


        res.json({ message: "helloworld from board" }); 
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const postBoard = async (req: Request, res: Response) => {
    try {

        console.log("check 1");

        const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
        
        if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
        }
    
        const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

        let name = req.body.name;
        let desc = req.body.desc;
        let id = decoded.id;
        
        const queryResult = await pool.query(
            `INSERT INTO Boards (name, description, owner_id) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [
              name,
              desc,
              id
            ]
          );
        res.status(201).json({ message: "Board Created" }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    }
};