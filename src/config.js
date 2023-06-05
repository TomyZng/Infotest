//Enviroment data
import { config} from "dotenv";

config()

//PORT constant
export const PORT = process.env.PORT || 3000

//DATABASE CREDENTIALS
export const DB_HOST = process.env.DB_HOST || '158.101.23.243'
export const DB_USER = process.env.DB_USER || 'usrNPDTest'
export const DB_PASSWORD = process.env.DB_PASSWORD || '8paxVH%q5ckFGc$'
export const DB_PORT = process.env.PORT || 3306
export const DB_NAME = process.env.DB_NAME || 'NPDT'
