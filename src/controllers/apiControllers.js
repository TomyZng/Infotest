import { pool } from "../db.js"

//CRUDS
//GET REQUEST
export const getUen = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM UEN")
    res.json(rows)
}

export const getEmpleados = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Empleado")
    res.json(rows)
}

export const getEquipo = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Equipo")
    res.json(rows)
}

export const getEstadoEmpleado = async (req,res) => {   
    const [rows] = await pool.query("SELECT * FROM Estado_Empleado")
    res.json(rows)
}

export const getEstadoProyecto = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Estado_Proyecto")
    res.json(rows)
}

export const getPlanificado = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Planificado")
    res.json(rows)
}

export const getPosicion = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Posicion")
    res.json(rows)
}

export const getProyectos = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Proyectos")
    res.json(rows)
}

export const getTipoProyecto = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Tipo_Proyecto")
    res.json(rows)
}

export const getUenEmpleado = async (req,res) => {
    const [rows] = await pool.query("SELECT * FROM Uen_Empleados")
    res.json(rows)
}

//Get filters
export const getUenF = async (req,res) => {
    try {
        const {id_uen} = req.params
        const [rows] = await pool.query("SELECT * FROM UEN WHERE id_uen = ?", [id_uen])
        
        if (rows.length <= 0) return res.status(404).json({
            message: 'Not found'
        })

        res.send(rows[0])

    } catch (e) {
        console.log(e)
    }
}

//POST REQUESTS
export const postUen = async (req,res) => {
    try {
    const {nombre} = req.body
    await pool.query('INSERT INTO UEN (nombre) VALUES (?)', [nombre])
    res.send('Post success')
    } catch (e) {
        console.log(e)
        res.send('Post Error')
    }

}  

//PATCH REQUESTS
export const updateUen = async (req,res) => {
    const {id_uen} = req.params
    const {nombre} = req.body

    const [result] = await pool.query('UPDATE UEN SET nombre = IFNULL(?, nombre) WHERE id_uen = ?', [nombre, id_uen])

    console.log(result)
    console.log(nombre)

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Not found'
    })

    const [rows] = await pool.query('SELECT * FROM UEN WHERE id_uen = ?', [id_uen])

    res.json(rows[0])
}

//PUT REQUEST

/*export const updateUen = async (req,res) => {
    const {id_uen} = req.params
    const {nombre} = req.body

    const [result] = await pool.query('UPDATE UEN SET nombre = ? WHERE id_uen = ?', [nombre, id_uen])

    console.log(result)
    console.log(nombre)

    if (result.affectedRows === 0) return res.status(404).json({
        message: 'Not found'
    })

    const [rows] = await pool.query('SELECT * FROM UEN WHERE id_uen = ?', [id_uen])

    res.json(rows[0])
}*/

//DELETE REQUEST

export const deleteUen = async (req,res) => {
    const {id_uen} = req.params
    const [result] = await pool.query
    ('DELETE FROM UEN where id_uen = ?', [id_uen])
    
    if (result.affectedRows <= 0) return res.status(404).json({
        message: 'Uen Not found'
    })  

   res.sendStatus(204)
} 


