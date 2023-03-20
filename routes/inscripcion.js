
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')



router.get('/', async function (req, res) {
    const result = await pool.query('select * from inscripcion')
    res.send(result.rows)
  });

  router.get('/:usuario', async function (req, res) {
    var p= req.params.usuario;
    const result = await pool.query("select * from inscripcion where id_usuario ='"+p+"'")
    res.send(result.rows)
  });




router.post('/', async function (req, res) {
    const text = 'INSERT INTO inscripcion(id, descripcion, periodo, estado, id_horario, id_familiar, id_usuario) VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING *'
    const values = [await getMax() + 1, req.body.descripcion, req.body.periodo, req.body.estado, req.body.id_horario, req.body.id_familiar, req.body.id_usuario]
  
    try {
      const resultado = await pool.query(text, values)
      res.send(resultado.rows[0])
    } catch (err) {
      console.log(err);
      res.send({})
    }
  });

  router.post('/update', async function (req, res) {
    const text = 'update inscripcion set descripcion = $2, periodo=$3 , id_horario=$4 , id_familiar=$5 where id = $1 RETURNING *'
    const values = [req.body.id, req.body.descripcion, req.body.periodo, req.body.id_horario,  req.body.id_familiar]
  
    try {
        const result = await pool.query(text, values)
        res.send(result.rows[0])
    } catch (err) {
        console.log(err.stack)
    }
  });




router.post('/anular', async function (req, res) {
    const text = "UPDATE inscripcion set estado = 'I' where id= $1 RETURNING *"
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
      const result = await pool.query("select coalesce (Max(id),0) from inscripcion")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }



module.exports = router;