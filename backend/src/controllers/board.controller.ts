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

export const getBoardsByUser = async (req: Request, res: Response) => {
    try {

        const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
        
        if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
        }
    
        const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

        const queryBoardids = await pool.query(
            "SELECT board_id FROM Board_Users WHERE user_id = $1",
            [decoded.id]
        );

        let boards: Board [] = [];

        for (let i = 0; i < queryBoardids.rows.length; i++) {
            const id = queryBoardids.rows[i].board_id; // Only get the board_id string
            // Query the DB for each board
            const queryBoard = await pool.query(
                "SELECT * FROM Boards WHERE id = $1",
                [id]
            );
        
            if (queryBoard.rows.length > 0) {
                const boardData = queryBoard.rows[0];
                const board = new Board(
                    boardData.id,
                    boardData.name,
                    boardData.description,
                    boardData.owner_id,
                    boardData.created_at
                );
                boards.push(board);
            }
        }
        

        //return board
        res.status(200).json(boards);
    } catch (error) {
        console.log(error);
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

        const newBoard = queryResult.rows[0];
        const boardId = newBoard.id;

        //query to insert new Board_Users
        const queryBoard_Users = await pool.query(
            `INSERT INTO Board_Users (board_id, user_id, role) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [
              boardId,
              id,
              'admin'
            ]
        );

        
        res.status(201).json({ message: "Board and Board_users created" }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    }
};