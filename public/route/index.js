import { Router } from "express";
import authRout from "./auth.js";
import userRout from "./user.js";
import productRout from "./product.js";
import addressRout from "./address.js";
import orderRouter from "./orders.js";
import cartRouter from "./cart.js";
import wishliastRouter from "./wishlist.js";
const router = Router();
router.get('/', (req, res) => {
    res.status(200).send({
        success: 1,
        message: 'Hello from MainStack Backend Developer Assessment. Check the API specification for further guidance and next steps.',
    });
});
router.use("/auth", authRout);
router.use("/user", userRout);
router.use("/product", productRout);
router.use("/address", addressRout);
router.use("/order", orderRouter);
router.use("/cart", cartRouter);
router.use("/wishliast", wishliastRouter);
export default router;
