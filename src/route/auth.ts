import { Router } from "express";
import { signUp } from "../controllers/auth";


const router = Router();

router.post("/resgister", signUp);

export default router;