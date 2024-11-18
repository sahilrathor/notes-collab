import { Request, Response } from "express";
import User from "../../models/userModel";

const deleteUser = async (req: Request, res: Response) => {
    const { id: _id } = req.params;

    const user = await User.findById(_id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ _id });

    res.status(200).json({ message: "User deleted successfully" });
}

export default deleteUser;