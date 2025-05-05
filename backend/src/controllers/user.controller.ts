import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../utils/db";
import User from "../models/user.model";
import { SECRET_KEY } from "../utils/secretKey";


export const getUserName = async (req: Request, res: Response) => {
  try {
    
    
    const queryResult = await pool.query(
      "SELECT fname, lname FROM Users WHERE email = $1",
      [req.body.id]
    );

    if (!queryResult.rows || queryResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const username = queryResult.rows[0].fname + " " + queryResult.rows[0].lname;

    

    console.log("user sent");
    res.status(200).json(username);
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { email: string };

    const queryResult = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [decoded.email]
    );

    if (!queryResult.rows || queryResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = queryResult.rows[0];

    const user = new User(
      userData.id,
      userData.fname,
      userData.lname,
      userData.email,
      "I will never send my id back to the frontend",
      userData.dob,
      userData.street,
      userData.city,
      userData.zip,
      userData.state
    );

    console.log("user sent");
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { fname, lname, email, password, dob, street, city, zip, state } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User(
      crypto.randomUUID(),
      fname,
      lname,
      email,
      hashedPassword,
      new Date(dob),
      street,
      city,
      zip,
      state
    );

    const queryResult = await pool.query(
      `INSERT INTO Users (fname, lname, email, password, dob, street, city, zip, state) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
       RETURNING *`,
      [
        newUser.fname,
        newUser.lname,
        newUser.email,
        newUser.password,
        newUser.dob,
        newUser.street,
        newUser.city,
        newUser.zip,
        newUser.state
      ]
    );
    console.log("account created");
    res.status(201).json({ message: "Account created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sayHello = async (req: Request, res: Response) => {
  try {
    res.json({ message: "helloworld from user" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    
    if (req.headers["authorization"]) {
      let userInfo = req.headers["authorization"].split(" ")[1]; // Base 64 Encoded
      let decodedUserInfo = atob(userInfo);
      let email = decodedUserInfo.split(":")[0];
      let password = decodedUserInfo.split(":")[1];

      let queryResult = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (queryResult.rows.length > 0) {
        let user = queryResult.rows[0];
        bcrypt.compare(password, user.password.trim(), (err: any, result: any) => {
          if (result) {
            let token = jwt.sign(
              {
                email: user.email,
                id: user.id
              },
              SECRET_KEY
            );
            console.log("logged in");
            res.status(200).send({
              token: token,
            });
          } else {
            res.status(401).send({
              status: 401,
              message: "Incorrect password",
            });
          }
        });
      } else {
        res.status(401).send({
          message: "No account with that email found",
        });
      }
    } else {
      res.status(401).send({ message: "missing required login details" });
    }
  } catch (e) {
    console.error("Error in login route:", e); // Log the error
    res.status(500).send({ message: "Internal Server Error", error: e });
  }
};
