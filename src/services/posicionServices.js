import { pool } from "../database/db.js";

export const getPosicionData = async () => {
  const [rows] = await pool.query("SELECT * FROM Posicion ORDER BY nombre ASC");
  return rows;
};


export const getPosicionDatabyName = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM Posicion WHERE nombre = ?", [nombre]);
    return rows[0];
  };

  export const getPosicionDataById = async (id_posicion) => {
    const [rows] = await pool.query("SELECT * FROM Posicion WHERE id_posicion = ?", [id_posicion]);
    return rows[0];
  };
  
