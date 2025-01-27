import { Router } from "express";
import { updateMe } from "../controllers/user";
import { protect } from "../controllers/auth";



const router = Router();

router.patch("/update/:userId", protect, updateMe);

export default router;