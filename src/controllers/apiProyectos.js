import { pool } from "../database/db.js"

export const getProyectos = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Proyectos")
    res.json(rows)
}
