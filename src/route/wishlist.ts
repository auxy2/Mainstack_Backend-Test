import { Router } from "express";
import { addWishlist, getWishlist, removeWishList } from "../controllers/wishlist";
import { protect } from "../controllers/auth";



const router = Router();

router.use(protect);
router.post("/add", addWishlist)
router.post("/remove", removeWishList);
router.get("/", getWishlist);

export default router