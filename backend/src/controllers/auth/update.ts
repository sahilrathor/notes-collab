import { Request, Response } from "express";
import User from "../../models/userModel";
import { hashPassword, comparePassword } from "../../utils/bcryptPassword";


const update = async (req: Request, res: Response) => {
    const { userName, newPassword, confirmNewPassword } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // const isMatch = await comparePassword(oldPassword, user.password);
    // if (!isMatch) {
    //     return res.status(401).json({ message: "Invalid old password" });
    // }

    if (newPassword !== confirmNewPassword) {
        return res.status(401).json({ message: "New password and confirm password do not match" });
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
}

export default update;