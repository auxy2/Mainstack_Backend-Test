import { Router } from "express";
import { createOrder } from "../controllers/order";
import { protect } from "../controllers/auth";


const router = Router();

router.use(protect)
router.post("/create", createOrder);

export default router;