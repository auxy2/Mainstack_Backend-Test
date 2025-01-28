import { Router } from "express";
import { deflate } from "zlib";
import { addCart, getCart, removeCart } from "../controllers/cart";
import { protect } from "../controllers/auth";



const router = Router();

router.use(protect);
router.post("/add", addCart)
router.post("/remove", removeCart); 
router.get("/", getCart);
export default router;