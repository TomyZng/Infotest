import { Router } from "express";
import { getIndex, getTest, getUenOrder } from "../controllers/indexControllers.js";



const router = Router()

router.get('/', getIndex)

router.get('/test', getTest)

router.get('/testFilter', getUenOrder)

export default router