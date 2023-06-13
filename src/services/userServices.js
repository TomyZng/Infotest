import { pool } from "../database/db.js";

export const getUenOrderServices = async (orden) => {
  try {
    let query = '';
    if (orden === 'ascendente') {
      query = 'SELECT * FROM UEN ORDER BY id_uen ASC';
    } else if (orden === 'descendente') {
      query = 'SELECT * FROM UEN ORDER BY id_uen DESC';
    }

    const [rows] = await pool.query(query);
    return rows;

  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener los datos de la API');
  }
};