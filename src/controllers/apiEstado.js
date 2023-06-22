import { getEstadoData, getEstadoDatabyName } from "../services/estadoEmpleadoServices.js";


export const getEstadoE = async (req,res) => {
    try {
        const data = await getEstadoData();
    
        // Transformar los datos en el formato adecuado para el HTML
        const options = data.map(estado => ({ value: estado.id_estado, label: estado.nombre }));
    
        res.json(options);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los datos de UEN' });
      }
}



export const getEstadobyName = async (req, res) => {
    try {
      const { nombre } = req.params;
      const estado = await getEstadoDatabyName(nombre);
  
      if (!estado) {
        res.status(404).json({ message: `estado with nombre ${nombre} not found` });
      } else {
        // Transformar el resultado en el formato adecuado para el HTML
        const option = { value: estado.id_estado, label: estado.nombre };
        res.json(option);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.message || `estado with nombre ${nombre} not found`;
      res.status(500).json({ error: errorMessage });
    }
  };
