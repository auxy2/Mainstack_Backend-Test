import { Router } from "express";
import { addproduct, getProduct, productById, products, productsCat } from "../controllers/prouduct.js";
import { protect } from "../controllers/auth.js";


const router = Router();

router.post("/create", protect, addproduct);
router.get("/search/:query", getProduct);
router.get("/", products);
router.get("/:category", productsCat);
router.get("/get/:id", productById);

export default router;