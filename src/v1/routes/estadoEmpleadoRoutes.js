import { Router } from "express";
import { getEstadoById, getEstadoE, getEstadobyName } from "../../controllers/apiEstado.js";

const router = Router()

router 
    .get('/estadoE', getEstadoE)
    .get('/estadoE/:nombre', getEstadobyName)
    .get('/estadoE/:id_estado', getEstadoById)

export default router