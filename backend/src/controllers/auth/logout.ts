import { Request, Response } from 'express';

const logout = async (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            maxAge: 0
        })
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

export default logout;