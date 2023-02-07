
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')


router.get('/', async function (req, res) {
    const result = await pool.query('select * from menu')
    res.send(result.rows)
});

router.get('/usuario', async function (req, res) {
    const result = await pool.query('select * from menu')
    res.send(result.rows)
});


router.post('/', async function (req, res) {

    const text = 'INSERT INTO menu_x_usuario(id_menu, id_usuario, "create", update, search, delete, id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [req.body.id_menu, req.body.id_usuario, req.body.create, req.body.update, false, req.body.delete, await getMax() + 1]
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
    const result = await pool.query("select u.id_menu, u.id_usuario,u.create,u.update,u.delete,m.ruta from menu_x_usuario as u inner join menu as m ON u.id_menu= m.id where u.id_usuario = '" + u + "'")
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
