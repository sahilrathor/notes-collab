import express from 'express'
import getAllUsers from "../controllers/user/getAllUsers";

const router = express.Router();

router.get('/list', getAllUsers);

export default router;