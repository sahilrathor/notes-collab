// import { Request, Response } from 'express';
// import generateTokenCookie from '../../utils/generateTokenCookie';
// import User from '../../models/userModel';
// import { userInterface } from '../../interfaces/userInterface';
// import { comparePassword } from '../../utils/bcryptPassword';


// const login = async (req: Request, res: Response) => {
//     const { userName, password } = req.body;

//     const user: userInterface | null = await User.findOne({ userName });


//     if (!user) {
//         res.status(200).json({ error: "User does not exist" });
//     }

//     const isPasswordCorrect = await comparePassword(password, user!.password);

//     if (!isPasswordCorrect) {
//         res.status(200).json({ message: "Incorrect password" });
//     }

//     if(user && isPasswordCorrect){
//         generateTokenCookie(user!._id.toString(), res)
//         res.status(200).json({ message: "Login successful", user: {
//             userName: user!.userName, 
//             email: user!.email, 
//             gender: user!.gender
//         } });
//     }
// }

// export default login;


import { Request, Response } from 'express';
import generateTokenCookie from '../../utils/generateTokenCookie';
import User from '../../models/userModel';
import { userInterface } from '../../interfaces/userInterface';
import { comparePassword } from '../../utils/bcryptPassword';

const login = async (req: Request, res: Response) => {
    const { userName, password, rememberMe } = req.body;

    // Check if the user exists
    const user: userInterface | null = await User.findOne({ userName });

    if (!user) {
        return res.status(400).json({ error: "User does not exist" });
    }

    // Check if the password is correct
    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Incorrect password" });
    }

    // If both user exists and password is correct, generate token and respond
    generateTokenCookie(user._id.toString(), res, rememberMe);
    
    return res.status(200).json({
        message: "Login successful",
        user: {
            userName: user.userName,
            email: user.email,
            gender: user.gender,
        },
    });
};

export default login;
