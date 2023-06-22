import { Router } from "express";
import { getEstadoE, getEstadobyName } from "../../controllers/apiEstado.js";

const router = Router()

router 
    .get('/estadoE', getEstadoE)
    .get('/estadoE/:nombre', getEstadobyName)

export default router