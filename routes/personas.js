

const express_1 = require("express");
const { INTEGER } = require("sequelize");
var router = express_1.Router();
const { pool } = require('../pg');
const { route } = require("./usuarios");


router.get('/', async function (req, res) {
    const result = await pool.query('select * from persona')
    res.send(result.rows)
});


router.post('/', async function (req, res) {
    const text = 'INSERT INTO persona(id, identificacion, nombres, direccion, correo, celular, telefono, empresaproveedor, idempresa, iddepartamento, tipo,estado)'
        + ' VALUES($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11,$12) RETURNING *'
    const values = [await getMax() + 1, req.body.identificacion, req.body.nombres, req.body.direccion, req.body.correo, req.body.celular, req.body.telefono,
    req.body.empresaproveedor, req.body.idempresa, req.body.iddepartamento, req.body.tipo, req.body.estado]

    try {
        const result = await pool.query(text, values)
        res.send(result.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
});

router.post('/update', async function (req, res) {
    const text = 'update persona set nombres = $2, direccion=$3, correo=$4, celular=$5, telefono=$6 where id = $1 RETURNING *'
    const values = [req.body.id, req.body.nombres, req.body.direccion, req.body.correo, req.body.celular, req.body.telefono]

    try {
        const result = await pool.query(text, values)
        res.send(result.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
});


router.post('/anular', async function (req, res) {
    const text = "UPDATE persona set estado = 'I' where id= $1 RETURNING *"
    const values = [req.body.id]
    try {
        const resultado = await pool.query(text, values)
        res.send(resultado.rows[0])
    } catch (err) {
        console.log(err);
        res.send({})
    }
});




async function getMax(params) {
    try {
        const result = await pool.query("select coalesce (Max(id),0) from persona")
        return result.rows[0].coalesce;
    } catch (error) {
        return 1;
    }

}



module.exports = router;
