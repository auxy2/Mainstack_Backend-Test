import { Router } from "express";
import { addAddress } from "../controllers/address";
import { protect } from "../controllers/auth";



const router = Router();


router.post("/create", protect, addAddress)

export default router