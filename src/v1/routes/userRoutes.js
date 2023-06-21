import { Router } from "express";
import { getForm, getIndex, getTest, getUenOrder } from "../../controllers/userControllers.js";
const router = Router()


router 
    .get('/',getIndex)
    .get('/test', getTest)
    .get('/testFilter', getUenOrder)
    .get('/form', getForm)
   

export default router