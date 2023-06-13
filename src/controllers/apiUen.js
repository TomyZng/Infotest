import { getUenData, getUenById, createUen, updateUenById, deleteUenById } from "../services/uenServices.js";

export const getUen = async (req, res) => {
  try {
    const data = await getUenData();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los datos de UEN' });
  }
};

export const getUenF = async (req, res) => {
  try {
    const { id_uen } = req.params;
    const uen = await getUenById(id_uen);

    if (!uen) {
      return res.status(404).json({
        message: 'Uen not found',
      });
    }
    res.json(uen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los datos de UEN' });
  }
};

export const postUen = async (req, res) => {
  try {
    const { nombre } = req.body;
    const uen = await createUen(nombre);
    res.json(uen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear UEN' });
  }
};

export const updateUen = async (req, res) => {
  const { id_uen } = req.params;
  const { nombre } = req.body;

  try {
    const uen = await updateUenById(id_uen, nombre);

    if (!uen) {
      return res.status(404).json({
        message: 'Uen not found',
      });
    }

    res.json(uen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al actualizar UEN' });
  }
};

export const deleteUen = async (req, res) => {
  const { id_uen } = req.params;

  try {
    const result = await deleteUenById(id_uen);

    if (!result) {
      return res.status(404).json({
        message: 'Uen not found',
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al eliminar UEN' });
  }
};
