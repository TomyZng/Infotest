import { pool } from "../database/db.js";

export const getEmployeesData = async () => {
  const [rows] = await pool.query("SELECT * FROM Empleado");
  return rows;
};

export const getEmployeesDataById = async (cod_empleado) => {
  const [rows] = await pool.query("SELECT * FROM Empleado WHERE cod_empleado = ?", [cod_empleado]);
  return rows[0];
};

export const createEmployee = async (cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla) => {
    const query = `
      INSERT INTO Empleado (
        cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, fecha_eval_prueba, mes_vacacion, fecha_inicio_vacaciones, fecha_final_vacaciones
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, DATE_ADD(?, INTERVAL 3 MONTH), MONTHNAME(DATE_ADD(?, INTERVAL 11 MONTH)), DATE_ADD(?, INTERVAL 11 MONTH), DATE_ADD(?, INTERVAL 12 MONTH)) 
    `;
  
    const values = [cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, fecha_de_ingreso, fecha_de_ingreso, fecha_de_ingreso, fecha_de_ingreso]; //Last fecha_de_ingreso representes the input value for date_add
  
    try {
      const result = await pool.query(query, values); //request to database
      const insertedCod = result.insertedCod; //save data in variable
      const employee = await getEmployeesDataById(insertedCod); //call all data of that cod and save it
      return { success: true, message: 'POST SUCCESS', employee};
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  

  