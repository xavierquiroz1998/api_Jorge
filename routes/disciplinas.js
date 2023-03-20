
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')

router.get('/', async function (req, res) {
    const result = await pool.query('select * from tb_disciplina')
    res.send(result.rows)
  });


  router.post('/', async function (req, res) {
    const text = 'INSERT INTO tb_disciplina(id, codigo, descripcion, estado) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [await getMax() + 1, req.body.codigo, req.body.descripcion, req.body.estado]
  
    try {
      const resultado = await pool.query(text, values)
      res.send(resultado.rows[0])
    } catch (err) {
      res.send({})
    }
  });


  router.post('/update', async function (req, res) {
    const text = 'update tb_disciplina set codigo = $2, descripcion=$3  where id = $1 RETURNING *'
    const values = [req.body.id, req.body.codigo, req.body.descripcion]

    try {
        const result = await pool.query(text, values)
        res.send(result.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
});


  async function getMax(params) {
    try {
      const result = await pool.query("select coalesce (Max(id),0) from tb_disciplina")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }


  router.post('/anular', async function (req, res) {
    const text = "UPDATE tb_disciplina set estado = 'I' where id= $1 RETURNING *"
    const values = [req.body.id]
    try {
      const resultado = await pool.query(text, values)
      res.send(resultado.rows[0])
    } catch (err) {
      console.log(err);
      res.send({})
    }
  });

  module.exports = router;