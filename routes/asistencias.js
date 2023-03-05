const express_1 = require("express");
var router = express_1.Router();
const { pool } = require('../pg')


router.get('/:periodo/:disciplina', async function (req, res) {
    var u = req.params.periodo;
    var d = req.params.disciplina;
    const result = await pool.query("select * from vw_asistencias where periodo = '" + u + "' and id_horario = '"+d+"'")
    res.send(result.rows)
});

router.get('/', async function (req, res) {
    const result = await pool.query("select * from asistencias")
    res.send(result.rows)
});

router.post('/', async function(req, res){

    const text = 'INSERT INTO asistencias (id_asistencia, fecha, periodo, id_horario, descripcion, estado) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
    const values = [await getMax() + 1, req.body.fecha, req.body.periodo, req.body.id_horario, req.body.descripcion, req.body.estado]
try {
    const result = await pool.query(text,values)
    res.send( result.rows[0])
} catch (error) {
    console.log(error);
    res.send({});
}
    
});


router.post('/det', async function(req, res){

    const text = 'INSERT INTO asistencias_det (secuencia, asistencias_cab, id_socio, asistencia, falta, retraso, motivo) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [await getMaxDet() + 1, req.body.asistencias_cab, req.body.id_socio, req.body.asistencia, req.body.falta, req.body.retraso, req.body.motivo]
try {
    const result = await pool.query(text,values)
    res.send( result.rows[0])
} catch (error) {
    console.log(error);
    res.send({});
}
    
});

router.get('/:idasistencia', async function(req, res){
    var c= req.params.idasistencia;
      const result = await pool.query("select * from asistencias_det where asistencias_cab = '"+c+"'")
      res.send( result.rows)
  });


  router.post('/anular', async function (req, res) {
    const text = "UPDATE asistencias set estado = 'I' where id_asistencia= $1 RETURNING *"
    const values = [req.body.id_asistencia]
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
      const result = await pool.query("select coalesce (Max(id_asistencia),1) from asistencias")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }
async function getMaxDet(params) {
    try {
      const result = await pool.query("select coalesce (Max(secuencia),1) from asistencias_det")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }




module.exports = router;