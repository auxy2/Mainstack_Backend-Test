import { Router } from "express"
import authRout from "./auth"
import userRout from "./user"
import productRout from "./product"

const router = Router()

router.get('/', (req, res) => {
    res.status(200).send({
      success: 1,
      message:
        'Hello from MainStack Backend Developer Assessment. Check the API specification for further guidance and next steps.',
    });
  });

router.use("/auth", authRout );
router.use("/user", userRout)
router.use("/product", productRout)

export default router