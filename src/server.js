//Start point file, settings for deployment
import { PORT } from './config.js'
import app from './app.js'

app.listen(PORT) //server port
console.log('Server on port', PORT )