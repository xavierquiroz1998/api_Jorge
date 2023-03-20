
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')


router.get('/', async function (req, res) {
    const result = await pool.query('select * from tb_catalogo')
    res.send(result.rows)
  });


  
  router.post('/', async function (req, res) {
    const text = 'INSERT INTO tb_catalogo(id, id_tipo_catalogo, descripcion, estado) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [await getMax() + 1, req.body.id_tipo_catalogo, req.body.descripcion, req.body.estado]
  
    try {
      const resultado = await pool.query(text, values)
      res.send(resultado.rows[0])
    } catch (err) {
      res.send({})
    }
  });

  router.post('/anular', async function (req, res) {
    const text = "UPDATE tb_catalogo set estado = 'I' where id= $1 RETURNING *"
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
      const result = await pool.query("select coalesce (Max(id),0) from tb_catalogo")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }






module.exports = router;