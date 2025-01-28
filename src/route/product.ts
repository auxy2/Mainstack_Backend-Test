import { Router } from "express";
import { addproduct } from "../controllers/prouduct";
import { protect } from "../controllers/auth";


const router = Router();

router.post("/create", protect, addproduct);

export default router;