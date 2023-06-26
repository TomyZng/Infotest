import { Router } from "express";
import { getEdit, getForm, getIndex, getList, getTest, getUenOrder } from "../../controllers/userControllers.js";
const router = Router()


router 
    .get('/',getIndex)
    .get('/test', getTest)
    .get('/testFilter', getUenOrder)
    .get('/form', getForm)
    .get('/list', getList)
    .get('/edit', getEdit)
   

export default router