import { Router } from "express"
import authRout from "./auth"

const router = Router()

router.get('/', (req, res) => {
    res.status(200).send({
      success: 1,
      message:
        'Hello from MainStack Backend Developer Assessment. Check the API specification for further guidance and next steps.',
    });
  });

router.use("/auth", authRout );

export default router