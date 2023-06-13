import { pool } from "../database/db.js";

export const getUenData = async () => {
  const [rows] = await pool.query("SELECT * FROM UEN");
  return rows;
};

export const getUenById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM UEN WHERE id_uen = ?", [id]);
  if (rows.length <= 0) return null;
  return rows[0];
};

export const createUen = async (nombre) => {
  const result = await pool.query('INSERT INTO UEN (nombre) VALUES (?)', [nombre]);
  const insertedId = result.insertId; //Save new ID created
  const uen = await getUenById(insertedId);
  return uen;
};

export const updateUenById = async (id, nombre) => {
  const [result] = await pool.query('UPDATE UEN SET nombre = IFNULL(?, nombre) WHERE id_uen = ?', [nombre, id]);
  if (result.affectedRows === 0) return null;
  const uen = await getUenById(id);
  return uen;
};

export const deleteUenById = async (id) => {
  const [result] = await pool.query('DELETE FROM UEN WHERE id_uen = ?', [id]);
  if (result.affectedRows === 0) return false;
  return true;
};
