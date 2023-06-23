import { pool } from "../database/db.js";

export const getEstadoData = async () => {
  const [rows] = await pool.query("SELECT * FROM Estado_Empleado ORDER BY nombre ASC");
  return rows;
};

export const getEstadoDatabyName = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM Estado_Empleado WHERE nombre = ?", [nombre]);
    return rows[0];
  };
