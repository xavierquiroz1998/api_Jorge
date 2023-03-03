
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')


router.get('/', async function (req, res) {
    const result = await pool.query('select * from menu')
    res.send(result.rows)
});



router.post('/', async function (req, res) {

    const text = 'INSERT INTO menu_x_usuario(id, id_usuario, id_menu) VALUES($1, $2, $3) RETURNING *'
    const values = [await getMax() + 1, req.body.id_usuario, req.body.id_menu,  ]
    try {
        const result = await pool.query(text, values);
        res.send(result.rows[0])
    } catch (error) {
        console.log(error);
        res.send({});
    }
});


router.get('/permiso/:usuario', async function (req, res) {
    var u = req.params.usuario;
    const result = await pool.query("select * from menu_usuario where id_usuario = '" + u + "'")
    res.send(result.rows)
});


async function getMax(params) {
    try {
        const result = await pool.query("select coalesce (Max(id),1) from menu_x_usuario")
        return result.rows[0].coalesce;
    } catch (error) {
        return 1;
    }

}



module.exports = router;
