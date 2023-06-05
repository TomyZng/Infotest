//App being exported to index
import express from 'express'
import indexRoutes from './routes/indexRoutes.js'
import apiRoutes from './routes/apiRoutes.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from "body-parser"

const app = express()

const __dirname = dirname (fileURLToPath(import.meta.url)) //absolute link, starts at src/

app.set('views', join(__dirname, 'views')) //join src/views
app.set('view engine', 'ejs') //set ejs as our view end
app.use(bodyParser.urlencoded({ extended: false })) //middleware for post request

//npm run app
app.use(indexRoutes)
app.use('/api', apiRoutes)

export default app;