import { Router } from "express";
import { deleteMe, updateMe } from "../controllers/user";
import { protect } from "../controllers/auth";



const router = Router();

router.patch("/update/:userId", protect, updateMe);
router.delete("/delete", protect, deleteMe);

export default router;