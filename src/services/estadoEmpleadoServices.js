import { pool } from "../database/db.js";

export const getEstadoData = async () => {
  const [rows] = await pool.query("SELECT * FROM Estado_Empleado ORDER BY nombre ASC");
  return rows;
};

export const getEstadoDatabyName = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM Estado_Empleado WHERE nombre = ?", [nombre]);
    return rows[0];
  };


  export const getEstadoDataById = async (id_estado) => {
    const [rows] = await pool.query("SELECT * FROM Estado_Empleado WHERE id_estado = ?", [id_estado]);
    return rows[0];
  };
  