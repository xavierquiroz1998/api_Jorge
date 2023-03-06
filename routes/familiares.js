
const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')



router.get('/', async function (req, res) {
  const result = await pool.query('select * from familiares')
  res.send(result.rows)
});

router.get('/:idUsuario', async function (req, res) {
  var c= req.params.idUsuario;
  const result = await pool.query("select * from familiares where id_usuario ='"+c+"'")
  res.send(result.rows)
});




router.post('/', async function (req, res) {
  const text = 'INSERT INTO familiares(id, codigo_socio, nombre_socio, identificacion, nombres, tipo, celular, correo, domicilio, fecha_nac, estado, id_usuario) VALUES($1, $2, $3, $4, $5, $6, $7,$8, $9, $10,$11, $12) RETURNING *'
  const values = [await getMax() + 1, req.body.codigo_socio, req.body.nombre_socio, req.body.identificacion, req.body.nombres, req.body.tipo, req.body.celular, req.body.correo, req.body.domicilio, req.body.fecha_nac, req.body.estado, req.body.id_usuario]

  try {
    const resultado = await pool.query(text, values)
    res.send(resultado.rows[0])
  } catch (err) {
    console.error(err)
    res.send({})
  }
});

router.post('/update', async function (req, res) {
  const text = 'update familiares set nombres=$2 , tipo = $3, celular=$4 ,correo = $5, domicilio=$6  where id = $1 RETURNING *'
  const values = [req.body.id, req.body.nombres, req.body.tipo, req.body.celular, req.body.correo, req.body.domicilio,]

  try {
      const result = await pool.query(text, values)
      res.send(result.rows[0])
  } catch (err) {
      console.log(err.stack)
  }
});




async function getMax(params) {
  try {
    const result = await pool.query("select coalesce (Max(id),1) from familiares")
    return result.rows[0].coalesce;
  } catch (error) {
    return 1;
  }

}


router.post('/anular', async function (req, res) {
  const text = "UPDATE familiares set estado = 'I' where id= $1 RETURNING *"
  const values = [req.body.id]
  try {
    const resultado = await pool.query(text, values)
    res.send(resultado.rows[0])
  } catch (err) {
    console.log(err);
    res.send({})
  }
});


router.post('/aprobar', async function (req, res) {
  const text = "UPDATE familiares set estado = 'A' where id= $1 RETURNING *"
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
