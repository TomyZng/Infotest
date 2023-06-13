import { pool } from "../database/db.js"


export const getPlanificado = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Planificado")
    res.json(rows)
}




