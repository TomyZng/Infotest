import { getPosicionData, getPosicionDataById, getPosicionDatabyName } from "../services/posicionServices.js";


export const getPosicion = async (req,res) => {
    try {
        const data = await getPosicionData();
    
        // Transformar los datos en el formato adecuado para el HTML
        const options = data.map(equipo => ({ value: equipo.id_posicion, label: equipo.nombre }));
    
        res.json(options);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los datos de UEN' });
      }
}

export const getPosicionbyName = async (req, res) => {
    try {
      const { nombre } = req.params;
      const posicion = await getPosicionDatabyName(nombre);
  
      if (!posicion) {
        res.status(404).json({ message: `Posicion with nombre ${nombre} not found` });
      } else {
        // Transformar el resultado en el formato adecuado para el HTML
        const option = { value: posicion.id_posicion, label: posicion.nombre };
        res.json(option);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.message || `Posicion with nombre ${nombre} not found`;
      res.status(500).json({ error: errorMessage });
    }
  };



  export const getPosicionById = async (req, res) => {
    try {
      const { id_posicion } = req.params;
      const posicion = await getPosicionDataById(id_posicion);
  
      if (!posicion) {
        res.status(404).json({ message: `Posicion with id_posicion ${id_posicion} not found` });
      } else {
        res.json(posicion);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.message || `Posicion with id_posicion ${id_posicion} not found`;
      res.status(500).json({ error: errorMessage });
    }
  };
  
