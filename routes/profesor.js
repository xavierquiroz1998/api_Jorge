const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')



router.get('/', async function (req, res) {
  const result = await pool.query('select * from tb_profesores')
  res.send(result.rows)
});


router.get('/xHorario/:idProfesor', async function (req, res) {
  var c= req.params.idProfesor;
  const result = await pool.query("select * from profesor_x_horario where id_profesor ='"+c+"'")
  res.send(result.rows)
});



router.post('/', async function (req, res) {
  const text = 'INSERT INTO tb_profesores(id, identificacion, nombres, apellidos, celular, correo, domicilio, estado) VALUES($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *'
  const values = [await getMax() + 1, req.body.identificacion, req.body.nombres, req.body.apellidos, req.body.celular, req.body.correo, req.body.domicilio , req.body.estado]

  try {
    const resultado = await pool.query(text, values)
    res.send(resultado.rows[0])
  } catch (err) {
    res.send({})
  }
});

router.post('/update', async function (req, res) {
  const text = 'update tb_profesores set nombres=$2 , apellidos = $3, celular=$4 ,correo = $5, domicilio=$6  where id = $1 RETURNING *'
  const values = [req.body.id, req.body.nombres, req.body.apellidos, req.body.celular, req.body.correo, req.body.domicilio ]

  try {
      const result = await pool.query(text, values)
      res.send(result.rows[0])
  } catch (err) {
      console.log(err.stack)
  }
});

router.post('/delete', async function (req, res) {
  const text = 'delete from profesor_x_horario where id_profesor =$1 RETURNING *'
  const values = [req.body.id ]

  try {
      const result = await pool.query(text, values)
      res.send(result.rows[0])
  } catch (err) {
      console.log(err.stack)
  }
});


router.post('/xHorario', async function (req, res) {
  const text = 'INSERT INTO profesor_x_horario(id, id_profesor, id_horario) VALUES($1, $2, $3) RETURNING *'
  const values = [await getMaxHorario() + 1, req.body.id_profesor, req.body.id_horario]

  try {
    const resultado = await pool.query(text, values)
    res.send(resultado.rows[0])
  } catch (err) {
    res.send({})
  }
});



async function getMax(params) {
  try {
    const result = await pool.query("select coalesce (Max(id),1) from tb_profesores")
    return result.rows[0].coalesce;
  } catch (error) {
    return 1;
  }

}

async function getMaxHorario(params) {
  try {
    const result = await pool.query("select coalesce (Max(id),1) from profesor_x_horario")
    return result.rows[0].coalesce;
  } catch (error) {
    return 1;
  }

}




router.post('/anular', async function (req, res) {
  const text = "UPDATE tb_profesores set estado = 'I' where id= $1 RETURNING *"
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
