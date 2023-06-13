import { Router } from "express";
import {deleteUen, getUen, getUenF, postUen, updateUen } from "../../controllers/apiUen.js"

const router = Router()

router
    .get('/uen', getUen) 
    //Router Filters
    .get('/uen/:id_uen', getUenF)
    //Router Posts
    .post('/post', postUen)
    //Router Patch
    .patch('/uen/:id_uen', updateUen)
    //Router Deletes
    .delete('/uen/:id_uen', deleteUen)

export default router