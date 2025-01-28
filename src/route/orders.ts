import { Router } from "express";
import { cancelOrder, createOrder } from "../controllers/order";
import { protect } from "../controllers/auth";


const router = Router();

router.use(protect)
router.post("/create", createOrder);
router.delete("/cancel/:id", cancelOrder);

export default router;