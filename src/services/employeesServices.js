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
  
  export const updateEmployeeByID = async (cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla) => {
    const query = `
      UPDATE Empleado SET 
        id_posicion = IFNULL(?, id_posicion),
        id_equipo = IFNULL(?, id_equipo),
        id_estado = IFNULL(?, id_estado),
        nombre = IFNULL(?, nombre),
        apellido = IFNULL(?, apellido),
        edad = IFNULL(?, edad),
        fecha_de_ingreso = IFNULL(?, fecha_de_ingreso),
        genero_sigla = IFNULL(?, genero_sigla),
        fecha_eval_prueba = DATE_ADD(IFNULL(?, fecha_de_ingreso), INTERVAL 3 MONTH),
        mes_vacacion = MONTHNAME(DATE_ADD(IFNULL(?, fecha_de_ingreso), INTERVAL 11 MONTH)),
        fecha_inicio_vacaciones = DATE_ADD(IFNULL(?, fecha_de_ingreso), INTERVAL 11 MONTH),
        fecha_final_vacaciones = DATE_ADD(IFNULL(?, fecha_de_ingreso), INTERVAL 12 MONTH)
      WHERE cod_empleado = ?`;
      
    const values = [
      id_posicion,
      id_equipo,
      id_estado,
      nombre,
      apellido,
      edad,
      fecha_de_ingreso,
      genero_sigla,
      fecha_de_ingreso,
      fecha_de_ingreso,
      fecha_de_ingreso,
      fecha_de_ingreso,
      cod_empleado
    ];
    
    try {
      const [result] = await pool.query(query, values);
      if (result.affectedRows === 0) return null;
      const employee = await getEmployeesDataById(cod_empleado);
      return employee;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const deleteEmployeeById = async (cod_empleado) => {
    const [result] = await pool.query('DELETE FROM Empleado WHERE cod_empleado = ?', [cod_empleado]);
    if (result.affectedRows === 0) return false;
    return true;
  };
  

  