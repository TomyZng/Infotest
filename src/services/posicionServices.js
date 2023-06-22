import { pool } from "../database/db.js";

export const getPosicionData = async () => {
  const [rows] = await pool.query("SELECT * FROM Posicion");
  return rows;
};

export const getPosicionDatabyName = async (nombre) => {
    const [rows] = await pool.query("SELECT * FROM Posicion WHERE nombre = ?", [nombre]);
    return rows[0];
  };

