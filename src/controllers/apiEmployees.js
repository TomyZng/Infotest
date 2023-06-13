import { pool } from "../database/db.js"


export const getEmpleados = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Empleado")
    res.json(rows)
}