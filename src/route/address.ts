import { Router } from "express";
import { addAddress, deleteAddress, getUserAddress, updateAddress } from "../controllers/address.js";
import { protect } from "../controllers/auth.js";



const router = Router();

router.use(protect);
router.post("/create", addAddress);
router.patch("/update/:id", updateAddress);
router.get("/", getUserAddress);
router.delete("/delete/:id", deleteAddress);

export default router