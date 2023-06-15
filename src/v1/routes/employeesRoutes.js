import { Router } from "express";
import { deleteEmpleado, getEmpleados, getEmpleadosById, postEmpleado, updateEmpleado } from "../../controllers/apiEmployees.js"

const router = Router()

router
    .get('/empleado', getEmpleados) 
    .get('/empleado/:cod_empleado', getEmpleadosById)
    .post('/empleado', postEmpleado)
    .patch('/empleado/:cod_empleado', updateEmpleado)
    .delete('/empleado/:cod_empleado', deleteEmpleado)


export default router