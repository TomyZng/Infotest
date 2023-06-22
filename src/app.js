//App being exported to index
import express from 'express'
import indexRoutes from './v1/routes/userRoutes.js'
import employeesRoutes from './v1/routes/employeesRoutes.js'
import proyectoRoutes from './v1/routes/proyectoRoutes.js'
import planificadoRoutes from './v1/routes/planificadoRoutes.js'
import equipoRoutes from './v1/routes/equipoRoutes.js'
import estadoEmpleadoRoutes from './v1/routes/estadoEmpleadoRoutes.js'
import posicionRoutes from './v1/routes/posicionRoutes.js'
import uenRoutes from './v1/routes/uenRoutes.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from "body-parser"

const app = express()

const __dirname = dirname (fileURLToPath(import.meta.url)) //absolute link, starts at src/

app.set('views', join(__dirname, 'views')) //join src/views
app.set('view engine', 'ejs') //set ejs as our view end
app.use(bodyParser.urlencoded({ extended: false })) //middleware for post request
app.use(bodyParser.json());//middleware for put/patch request

//npm run app
app.use(indexRoutes)
app.use('/api/v1', employeesRoutes, proyectoRoutes, planificadoRoutes, uenRoutes, equipoRoutes, estadoEmpleadoRoutes, posicionRoutes)
app.use(express.static('src'));

export default app;