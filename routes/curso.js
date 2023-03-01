
const express_1 = require("express");
var router = express_1.Router();
const { pool} = require('../pg')

 
router.get('/', async function(req, res){
    const result = await pool.query('select * from cursos')
    res.send( result.rows)
});

router.get('/det/:idcurso', async function(req, res){
  var c= req.params.idcurso;
    const result = await pool.query("select * from curso_det where id_cab = '"+c+"'")
    res.send( result.rows)
});

router.post('/', async function(req, res){

    const text = 'INSERT INTO cursos (id, descripcion, periodo, estado) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [await getMax() + 1, req.body.descripcion, req.body.periodo, req.body.estado]
try {
    const result = await pool.query(text,values)
    res.send( result.rows[0])
} catch (error) {
    console.log(error);
    res.send({});
}
    
});

router.post('/det', async function(req, res){

    const text = 'INSERT INTO curso_det (id, id_cab, id_socio, id_horario) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [await getMaxDet() + 1, req.body.id_cab, req.body.id_socio, req.body.id_horario]
try {
    const result = await pool.query(text,values)
    res.send( result.rows[0])
} catch (error) {
    console.log(error);
    res.send({});
}
    
});


router.post('/anular', async function (req, res) {
    const text = "UPDATE tb_usuarios set estado = 'I' where id= $1 RETURNING *"
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
      const result = await pool.query("select coalesce (Max(id),1) from cursos")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }
async function getMaxDet(params) {
    try {
      const result = await pool.query("select coalesce (Max(id),1) from curso_det")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }


module.exports = router;



