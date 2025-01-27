import { Router } from "express";
import { getUser, login, logout, signUp } from "../controllers/auth";


const router = Router();

router.post("/resgister", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/protect", getUser);

export default router;