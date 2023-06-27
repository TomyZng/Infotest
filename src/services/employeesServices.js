import { pool } from "../database/db.js";

// Obtener todos los datos de los empleados
export const getEmployeesData = async () => {
  const [rows] = await pool.query("SELECT * FROM Empleado");
  return rows;
};

// Obtener los datos de un empleado por su código de empleado
export const getEmployeesDataById = async (cod_empleado) => {
  const [rows] = await pool.query("SELECT * FROM Empleado WHERE cod_empleado = ?", [cod_empleado]);
  return rows[0];
};

// Crear un nuevo empleado
export const createEmployee = async (cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, telefono) => {
  const query = `
    INSERT INTO Empleado (
      cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, telefono, fecha_eval_prueba, mes_vacacion, fecha_inicio_vacaciones, fecha_final_vacaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DATE_ADD(?, INTERVAL 3 MONTH), MONTHNAME(DATE_ADD(?, INTERVAL 11 MONTH)), DATE_ADD(?, INTERVAL 11 MONTH), DATE_ADD(?, INTERVAL 12 MONTH)) 
  `;

  const values = [cod_empleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, telefono, fecha_de_ingreso, fecha_de_ingreso, fecha_de_ingreso, fecha_de_ingreso]; // El último fecha_de_ingreso representa el valor de entrada para date_add

  try {
    const result = await pool.query(query, values); // Consulta a la base de datos
    const insertedCod = result.insertedCod; // Guardar datos en una variable
    const employee = await getEmployeesDataById(insertedCod); // Obtener todos los datos de ese código y guardarlos
    return { success: true, message: 'POST SUCCESS', employee };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Actualizar un empleado por su código de empleado
export const updateEmployeeByID = async (oldCodEmpleado, newCodEmpleado, id_posicion, id_equipo, id_estado, nombre, apellido, edad, fecha_de_ingreso, genero_sigla, telefono) => {
  const query = `
    UPDATE Empleado SET 
      cod_empleado = ?,
      id_posicion = IFNULL(?, id_posicion),
      id_equipo = IFNULL(?, id_equipo),
      id_estado = IFNULL(?, id_estado),
      nombre = IFNULL(?, nombre),
      apellido = IFNULL(?, apellido),
      edad = IFNULL(?, edad),
      fecha_de_ingreso = IFNULL(?, fecha_de_ingreso),
      genero_sigla = IFNULL(?, genero_sigla),
      telefono = IFNULL(?, telefono),
      fecha_eval_prueba = DATE_ADD(IFNULL(?, fecha_de_ingreso), INTERVAL 3 MONTH),
      mes_vacacion = MONTHNAME(DATE_ADD(IFNULL(?, fecha_de_ingreso), INTERVAL 11 MONTH)),
      fecha_inicio_vacaciones = DATE_ADD(IFNULL(?, fecha_de_ingreso), INTERVAL 11 MONTH),
      fecha_final_vacaciones = DATE_ADD(IFNULL(?, fecha_de_ingreso), INTERVAL 12 MONTH)
    WHERE cod_empleado = ?`;

  const values = [
    newCodEmpleado,
    id_posicion,
    id_equipo,
    id_estado,
    nombre,
    apellido,
    edad,
    fecha_de_ingreso,
    genero_sigla,
    telefono,
    fecha_de_ingreso,
    fecha_de_ingreso,
    fecha_de_ingreso,
    fecha_de_ingreso,
    oldCodEmpleado
  ];

  try {
    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) return null;
    const employee = await getEmployeesDataById(newCodEmpleado);
    return employee;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Eliminar un empleado por su código de empleado
export const deleteEmployeeById = async (cod_empleado) => {
  const [result] = await pool.query('DELETE FROM Empleado WHERE cod_empleado = ?', [cod_empleado]);
  if (result.affectedRows === 0) return false;
  return true;
};