import { Router } from "express";
import { addproduct, getProduct } from "../controllers/prouduct";
import { protect } from "../controllers/auth";


const router = Router();

router.post("/create", protect, addproduct);
router.get("/search/:query", getProduct);

export default router;