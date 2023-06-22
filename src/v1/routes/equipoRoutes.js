import { Router } from "express";
import { getEquipo, getEquipobyName } from "../../controllers/apiEquipo.js";

const router = Router()

router 
    .get('/equipo', getEquipo)
    .get('/equipo/:nombre', getEquipobyName)

export default router