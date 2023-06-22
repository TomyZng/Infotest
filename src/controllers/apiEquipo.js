import { getEquipoData, getEquipoDatabyName } from "../services/equipoServices.js";


export const getEquipo = async (req,res) => {
    try {
        const data = await getEquipoData();
    
        // Transformar los datos en el formato adecuado para el HTML
        const options = data.map(equipo => ({ value: equipo.id_equipo, label: equipo.nombre }));
    
        res.json(options);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los datos de equipo' });
      }
}


export const getEquipobyName = async (req, res) => {
    try {
      const { nombre } = req.params;
      const equipo = await getEquipoDatabyName(nombre);
  
      if (!equipo) {
        res.status(404).json({ message: `Equipo with nombre ${nombre} not found` });
      } else {
        // Transformar el resultado en el formato adecuado para el HTML
        const option = { value: equipo.id_equipo, label: equipo.nombre };
        res.json(option);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.message || `Equipo with nombre ${nombre} not found`;
      res.status(500).json({ error: errorMessage });
    }
  };
  
