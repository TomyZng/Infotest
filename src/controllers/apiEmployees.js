
import { createEmployee, getEmployeesData, getEmployeesDataById } from "../services/employeesServices.js";


export const getEmpleados = async (req, res) => {
    try {
      const data = await getEmployeesData();
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener los datos de empleados' });
    }
  };

  export const getEmpleadosById = async (req, res) => {
    try {
      const { cod_empleado } = req.params;
      const employee = await getEmployeesDataById(cod_empleado);
  
      if (!cod_empleado) {
        return res.status(404).json({
          message: 'Empleado not found',
        });
      }
      res.json(employee);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al obtener los datos de Empleado' });
    }
  };

  export const postEmpleado = async (req, res) => {
    try {
      const { cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla } = req.body;
      const employee = await createEmployee(cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla);
      res.json(employee);

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al crear Empleado' });
    }
  };