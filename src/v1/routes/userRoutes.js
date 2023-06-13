import { Router } from "express";
import { getIndex, getTest, getUenOrder } from "../../controllers/userControllers.js";
const router = Router()


router 
    .get('/',getIndex)
    .get('/test', getTest)
    .get('/testFilter', getUenOrder)
   

export default router