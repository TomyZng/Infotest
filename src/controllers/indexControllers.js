import { pool } from "../db.js"

export const getIndex = (req,res) => res.render('index')

export const getTest = (req,res) => res.render('testView')

export const getUenOrder = async (req, res) => {
    const { orden } = req.query;
    try {
    let query = ''
      if (orden === 'ascendente') {
        query = 'SELECT * FROM UEN ORDER BY id_uen ASC'
      } else if (orden === 'descendente') {
        query = 'SELECT * FROM UEN ORDER BY id_uen DESC'
      }

      const [rows] = await pool.query(query)

      res.render('testFilter', { data: rows });
  
    } catch (e) {
      console.log(e);
      res.status(404).send('Error al obtener los datos de la API');
    }
  };