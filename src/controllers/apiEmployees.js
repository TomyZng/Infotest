
import { createEmployee, deleteEmployeeById, getEmployeesData, getEmployeesDataById, updateEmployeeByID } from "../services/employeesServices.js";


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
  
      if (!employee) {
        res.status(404).json({ message: `Employee with cod_empleado ${cod_empleado} not found` });
      }
      res.json(employee);
      
    } catch (error) {
      console.log(error);
      const errorMessage = error.message || `Employee with cod_empleado ${cod_empleado} not found`;
      res.status(500).json({ error: errorMessage });
    }
  };

  export const postEmpleado = async (req, res) => {
    try {
      const { cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, telefono } = req.body;
      const employee = await createEmployee(cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, telefono);
      res.json(employee);
    } catch (error) {
      console.log(error);
      const errorMessage = error.sqlMessage || 'Error creating employee';
      res.status(500).json({ error: errorMessage });
    }
  };

  export const updateEmpleado = async (req, res) => {
    const { cod_empleado } = req.params;
    const { newCodEmpleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, telefono } = req.body;
  
    try {
      const empleado = await updateEmployeeByID(cod_empleado, newCodEmpleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, telefono);
  
      if (!empleado) {
        return res.status(404).json({
          message: 'Empleado not found',
        });
      }
      res.json(empleado);
    } catch (error) {
      console.log(error);
      const errorMessage = error.sqlMessage || 'Error updating employee';
      res.status(500).json({ error: errorMessage });
    }
  };
  
  
  export const deleteEmpleado = async (req, res) => {
    const { cod_empleado } = req.params;
  
    try {
      const result = await deleteEmployeeById(cod_empleado);
  
      if (!result) {
        return res.status(404).json({
          message: 'Employee not found',
        });
      }
      res.status(200).json({ message: `Employee with cod_empleado ${cod_empleado} successfully deleted` });
    } catch (error) {
      console.log(error);
      const errorMessage = error.sqlMessage || 'Error deleting employee';
      res.status(500).json({ error: errorMessage });
    }
  };
  