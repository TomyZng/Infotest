import { Router } from "express";
import { getPosicion, getPosicionById, getPosicionbyName } from "../../controllers/apiPosicion.js";

const router = Router()

router 
    .get('/posicion', getPosicion)
    .get('/posicion/:nombre', getPosicionbyName)
    .get('/posicion/:id_posicion', getPosicionById)

export default router