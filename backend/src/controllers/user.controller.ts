import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

const SECRET_KEY =
	"0fb5f53f4d7ae5114979d94d01ddf11bf7e11d30dadf025732642995194fdf5fa0e62d5f726de0315e09c780319f98e512dc3c3a6c0ea8c847e7f1e76885bcd0";


const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

let users:any = [];

export const sayHello = async (req: Request, res: Response) => {
    try {
        res.json({ message: "helloworld from user" }); 
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const createAccount = async (req: Request, res: Response) => {
    try {
      const { password, ...userData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { ...userData, password: hashedPassword };
      users.push(newUser);
      res.status(201).json({ message: "Account created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  export const login = async (req: Request, res: Response) => {
    try {
      if (req.headers["authorization"]) {
        let userInfo = req.headers["authorization"].split(" ")[1]; // Base64 Encoded
        let decodedUserInfo = Buffer.from(userInfo, "base64").toString();
        let [email, password] = decodedUserInfo.split(":");
        console.log(email, password, decodedUserInfo, userInfo);
  
        let user = users.find((u:any) => u.email === email);
  
        if (user) {
          const match = await bcrypt.compare(password, user.password);
          if (match) {
            let token = jwt.sign({ email: user.email }, SECRET_KEY);
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