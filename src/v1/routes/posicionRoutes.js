import { Router } from "express";
import { getPosicion, getPosicionbyName } from "../../controllers/apiPosicion.js";

const router = Router()

router 
    .get('/posicion', getPosicion)
    .get('/posicion/:nombre', getPosicionbyName)

export default router