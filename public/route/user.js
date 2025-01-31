import { Router } from "express";
import { deleteMe, updateMe } from "../controllers/user.js";
import { protect } from "../controllers/auth.js";
const router = Router();
router.patch("/update/:userId", protect, updateMe);
router.delete("/delete", protect, deleteMe);
export default router;
