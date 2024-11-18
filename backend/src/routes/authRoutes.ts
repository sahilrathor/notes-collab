import express from "express";
import login from "../controllers/auth/login";
import signup from "../controllers/auth/signup";
import logout from "../controllers/auth/logout";
import deleteUser from "../controllers/auth/deleteUser";
import update from "../controllers/auth/update";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.delete("/:id", deleteUser);
router.patch("/:id", update);

export default router;