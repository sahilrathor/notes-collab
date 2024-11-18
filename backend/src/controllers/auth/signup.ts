import { Request, Response } from 'express';
import User from '../../models/userModel';
import generateTokenCookie from '../../utils/generateTokenCookie';
import bcrypt from 'bcrypt';
import { hashPassword } from '../../utils/bcryptPassword';

const signup = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, confirmPassword, gender, firstName, lastName } = req.body;

        if (!userName || !email || !password || !confirmPassword || !gender || !firstName || !lastName) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password and Confirm Password do not match" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            gender,
            firstName,
            lastName
        })

        if (newUser) {
            await newUser.save();
            generateTokenCookie(newUser._id.toString(), res, false);
            res.status(200).json({ message: "User created successfully", user: newUser });
        }

    } catch (error) {
        res.status(400).json({ message: "User creation failed" });
        console.log("error:", error)
    }
}

export default signup;