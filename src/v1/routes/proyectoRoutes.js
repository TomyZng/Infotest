import { Router } from "express";
import { getProyectos } from "../../controllers/apiProyectos.js";
const router = Router()


router 
    .get('/proyect',getProyectos)
   

export default router