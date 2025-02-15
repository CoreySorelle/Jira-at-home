import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import User from "../models/user.model"

const SECRET_KEY =
	"0fb5f53f4d7ae5114979d94d01ddf11bf7e11d30dadf025732642995194fdf5fa0e62d5f726de0315e09c780319f98e512dc3c3a6c0ea8c847e7f1e76885bcd0";


const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

let users: User[] = [];

export const getUser = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }

        const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
        const userObject = users.find((u) => u.email === decoded.email);

        if (!userObject) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ fname: userObject.fname, lname: userObject.lname });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};


export const createAccount = async (req: Request, res: Response) => {
    try {
        const { fname, lname, email, password, dob, street, city, zip, state } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User instance
        const newUser = new User(
            crypto.randomUUID(), // Generate a unique ID
            fname,
            lname,
            email,
            hashedPassword, // Store hashed password
            new Date(dob), // Ensure DOB is stored as a Date object
            street,
            city,
            zip,
            state
        );

        users.push(newUser); // Add to users array

        res.status(201).json({ message: "Account created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ message: "Server error" });
    }
};

  export const login = async (req: Request, res: Response) => {
    try {
      if (req.headers["authorization"]) {
        let userInfo = req.headers["authorization"].split(" ")[1]; // Base64 Encoded
        let decodedUserInfo = Buffer.from(userInfo, "base64").toString();
        let [email, password] = decodedUserInfo.split(":");
        //console.log(email, password, decodedUserInfo, userInfo);
  
        let user = users.find((u:any) => u.email === email);
  
        if (user) {
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            let token = jwt.sign({ email: user.email }, SECRET_KEY);
            console.log("Generated Token:", token);
            res.status(200).send({ token: token });
          } else {
            res.status(401).send({ status: 401, message: "Incorrect password" });
          }
        } else {
          res.status(401).send({ message: "No account with that email found" });
        }
      } else {
        res.status(401).send({ message: "Missing required login details" });
      }
    } catch (e) {
      console.error("Error in login route:", e);
      res.status(500).send({ message: "Internal Server Error", error: e });
    }
  };

  export const sayHello = async (req: Request, res: Response) => {
    try {
        res.json({ message: "helloworld from user" }); 
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

/*export const login = async (req: Request, res: Response) => {
    try {
		//write some logic here
		if (req.headers["authorization"]) {
			let userInfo = req.headers["authorization"].split(" ")[1]; //Base 64 Encoded
			let decodedUserInfo = atob(userInfo);
			let email = decodedUserInfo.split(":")[0];
			let password = decodedUserInfo.split(":")[1];
			console.log(email, password, decodedUserInfo, userInfo);
			/*let queryResult = await pool.query(
				"SELECT * FROM User WHERE email = $1",
				[email]
			);

			if (queryResult.rows.length > 0) {
				let user = queryResult.rows[0];
				bcrypt.compare(
					password,
					user.password.trim(),
					(err: any, result: any) => {
						console.log({
							password,
							storedHash: user.password.trim(),
							err,
							result,
						});
						if (result) {
							let token = jwt.sign(
								{
									email: user.email,
								},
								SECRET_KEY
							);
							res.status(200).send({
								token: token,
							});
						} else {
							res.status(401).send({
								status: 401,
								message: "Incorrect password",
							});
						}
					}
				);
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
}*/