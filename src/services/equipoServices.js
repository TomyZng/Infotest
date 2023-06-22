import { pool } from "../database/db.js";

export const getEquipoData = async () => {
  const [rows] = await pool.query("SELECT * FROM Equipo");
  return rows;
};

export const getEquipoDatabyName = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM Equipo WHERE nombre = ?", [nombre]);
    return rows[0];
  };
  
 