import { Router } from "express";
import { connectLiveStream } from "./controller.js";


const router = Router()

router.get('/stream', connectLiveStream)

export default router;