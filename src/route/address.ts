import { Router } from "express";
import { addAddress, updateAddress } from "../controllers/address";
import { protect } from "../controllers/auth";



const router = Router();


router.post("/create", protect, addAddress);
router.patch("/update/:id", protect, updateAddress);

export default router