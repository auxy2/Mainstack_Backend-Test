import { Router } from "express";
import { cancelOrder, createOrder, getOrder } from "../controllers/order.js";
import { protect } from "../controllers/auth.js";
const router = Router();
router.use(protect);
router.post("/create", createOrder);
router.delete("/cancel/:id", cancelOrder);
router.get("/", getOrder);
export default router;
