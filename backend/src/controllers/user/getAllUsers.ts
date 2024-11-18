import express, { Request, Response } from "express";
import User from "../../models/userModel";

const getAllUsers = async (req: Request, res: Response) => {
    // const users = User.length > 0 ? await User.find({}) : [];
    const noOfUsers = User.length;
    const users = await User.find({});

    res.status(200).json({ noOfUsers, users });
}

export default getAllUsers