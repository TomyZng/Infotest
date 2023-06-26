import { getUenOrderServices } from "../services/userServices.js";


export const getIndex = (req,res) => res.render('index')

export const getTest = (req,res) => res.render('testView')

export const getForm = (req,res) => res.render('createEmployee')

export const getList = (req,res) => res.render('listEmployee')

export const getEdit = (req,res) => res.render('editEmployee')

export const getUenOrder = async (req, res) => {
  const { orden } = req.query;
  try {
    const data = await getUenOrderServices(orden);
    res.render('testFilter', { data });

  } catch (error) {
    console.log(error);
    res.status(404).send('Error al obtener los datos de la API');
  }
};

