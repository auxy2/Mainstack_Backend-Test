import { Router } from "express";
import { addproduct, getProduct, products } from "../controllers/prouduct";
import { protect } from "../controllers/auth";


const router = Router();

router.post("/create", protect, addproduct);
router.get("/search/:query", getProduct);
router.get("/", products);

export default router;