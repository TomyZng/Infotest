import { pool } from "../database/db.js";

export const getEquipoData = async () => {
  const [rows] = await pool.query("SELECT * FROM Equipo ORDER BY nombre ASC");
  return rows;
};

export const getEquipoDatabyName = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM Equipo WHERE nombre = ?", [nombre]);
    return rows[0];
  };

  export const getEquipoDataById = async (id_equipo) => {
    const [rows] = await pool.query("SELECT * FROM Equipo WHERE id_equipo = ?", [id_equipo]);
    return rows[0];
  };
  
 