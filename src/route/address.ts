import { Router } from "express";
import { addAddress, deleteAddress, updateAddress } from "../controllers/address";
import { protect } from "../controllers/auth";



const router = Router();


router.post("/create", protect, addAddress);
router.patch("/update/:id", protect, updateAddress);
router.delete("/delete/:id", protect, deleteAddress);

export default router