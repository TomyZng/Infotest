import { Router } from "express";
import { getEquipo, getEquipoById, getEquipobyName } from "../../controllers/apiEquipo.js";

const router = Router()

router 
    .get('/equipo', getEquipo)
    .get('/equipo/:nombre', getEquipobyName)
    .get('/equipo/:id_equipo', getEquipoById)   

export default router