import { Router } from "express";
import { getEmpleados } from "../../controllers/apiEmployees.js"

const router = Router()

router
    .get('/empleado', getEmpleados) 


export default router