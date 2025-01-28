import { Router } from "express";
import { cancelOrder, createOrder, getOrder } from "../controllers/order";
import { protect } from "../controllers/auth";


const router = Router();

router.use(protect)
router.post("/create", createOrder);
router.delete("/cancel/:id", cancelOrder);
router.get("/", getOrder);

export default router;