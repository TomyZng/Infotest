import { Router } from "express";
import { getEmpleados, getEmpleadosById, postEmpleado } from "../../controllers/apiEmployees.js"

const router = Router()

router
    .get('/empleado', getEmpleados) 
    .get('/empleado/:cod_empleado', getEmpleadosById)
    .post('/empleado', postEmpleado)


export default router