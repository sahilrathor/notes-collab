import { Response } from 'express';
import jwt from 'jsonwebtoken';

const generateTokenCookie = (userId: string, res: Response, rememberMe: boolean) => {
    const expires = rememberMe ? 7 : 1;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {expiresIn: `${expires}d`});
    // send userId as object 

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: expires * 24 * 60 * 60 * 1000
    })
}

export default generateTokenCookie;