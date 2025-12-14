import { Router } from "epress";
const router = Router()

import { signin, signup, googleAuth } from "./controller.js";

router.post('/signup', signup)
router.post('/signin', signin)
authRouter.post('/google', googleAuth)

export default router;