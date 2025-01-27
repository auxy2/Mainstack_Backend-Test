import { Router } from "express";
import { protect, login, logout, signUp } from "../controllers/auth";


const router = Router();

router.post("/resgister", signUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/protect", protect);

export default router;