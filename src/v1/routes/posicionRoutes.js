import { Router } from "express";
import { getPosicion, getPosicionById, getPosicionbyName } from "../../controllers/apiPosicion.js";

const router = Router()

router 
    .get('/posicion', getPosicion)
    .get('/posicion/:id_posicion', getPosicionById)
    .get('/posicion/:nombre', getPosicionbyName)

export default router