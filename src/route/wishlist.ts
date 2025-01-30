import { Router } from "express";
import { addWishlist, getWishlist, removeWishList } from "../controllers/wishlist.js";
import { protect } from "../controllers/auth.js";



const router = Router();

router.use(protect);
router.post("/add", addWishlist)
router.post("/remove", removeWishList);
router.get("/", getWishlist);

export default router