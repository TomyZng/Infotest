import { Router } from "express";
import { getPlanificado } from "../../controllers/apiPlanificado.js";

const router = Router()

router 
    .get('/plan', getPlanificado)

export default router