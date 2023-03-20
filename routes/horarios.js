


const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')



router.get('/', async function (req, res) {
  const result = await pool.query('select * from vw_horarios')
  res.send(result.rows)
});

router.get('/horario/:idprofesor', async function (req, res) {
  var c= req.params.idprofesor;
  const result = await pool.query("select * from vw_profesor_x_horario where id_horario ='"+c+"'")
  res.send(result.rows[0])
});

router.get('/disciplina/:iddisciplina', async function (req, res) {
  var c= req.params.iddisciplina;
  const result = await pool.query("select * from vw_horarios where id_disciplina = '"+c+"'")
  res.send(result.rows)
});

router.get('/Xprofesor', async function (req, res) {
  const result = await pool.query('select * from vw_Horario_x_profesor')
  res.send(result.rows)
});



router.post('/', async function (req, res) {
  const text = 'INSERT INTO horarios(id, id_disciplina, nivel, id_categoria, id_ciclo, valor, horario, estado) VALUES($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *'
  const values = [await getMax() + 1, req.body.id_disciplina, req.body.nivel, req.body.id_categoria, req.body.id_ciclo, req.body.valor, req.body.horario , req.body.estado]

  try {
    const resultado = await pool.query(text, values)
    res.send(resultado.rows[0])
  } catch (err) {
    res.send({})
  }
});

router.post('/update', async function (req, res) {
  const text = 'update horarios set id_disciplina = $2, nivel=$3, id_categoria=$4 , id_ciclo=$5 , valor=$6 , horario=$7  where id = $1 RETURNING *'
  const values = [req.body.id, req.body.id_disciplina, req.body.nivel, req.body.id_categoria, req.body.id_ciclo, req.body.valor, req.body.horario]

  try {
      const result = await pool.query(text, values)
      res.send(result.rows[0])
  } catch (err) {
      console.log(err.stack)
  }
});






async function getMax(params) {
  try {
    const result = await pool.query("select coalesce (Max(id),0) from horarios")
    return result.rows[0].coalesce;
  } catch (error) {
    return 1;
  }

}


router.post('/anular', async function (req, res) {
  const text = "UPDATE horarios set estado = 'I' where id= $1 RETURNING *"
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
