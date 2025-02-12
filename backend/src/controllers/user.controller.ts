import { Request, Response } from "express";

export const sayHello = async (req: Request, res: Response) => {
    try {
        res.json({ message: "helloworld from user" }); 
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};