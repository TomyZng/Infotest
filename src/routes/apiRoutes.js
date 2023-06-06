import { Router } from "express";
import {deleteUen, getEmpleados, getEquipo, getEstadoEmpleado, getEstadoProyecto, getPlanificado, getPosicion, getProyectos, getTipoProyecto, getUen, getUenEmpleado, getUenF, postUen, updateUen } from "../controllers/apiControllers.js";

const router = Router()

router.get('/uen', getUen) 
router.get('/empleado', getEmpleados) 
router.get('/equipo', getEquipo) 
router.get('/estadoE', getEstadoEmpleado) 
router.get('/estadoP', getEstadoProyecto) 
router.get('/plan', getPlanificado) 
router.get('/posicion', getPosicion) 
router.get('/proyectos', getProyectos) 
router.get('/tipoPro', getTipoProyecto) 
router.get('/uenE', getUenEmpleado) 

//Router Filters

router.get('/uen/:id_uen', getUenF)

//Router Posts
router.post('/post', postUen)

//Router Patch
router.patch('/uen/:id_uen', updateUen)

//Router Deletes
router.delete('/uen/:id_uen', deleteUen)

export default router