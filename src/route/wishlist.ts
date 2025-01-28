import { Router } from "express";
import { addWishlist } from "../controllers/wishlist";
import { protect } from "../controllers/auth";



const router = Router();

router.use(protect);
router.post("/add", addWishlist)

export default router