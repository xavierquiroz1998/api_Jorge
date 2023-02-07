
const express_1 = require("express");
var router = express_1.Router();
const { pool} = require('../pg')

 
router.get('/', async function(req, res){
    const result = await pool.query('select * from usuarios')
    res.send( result.rows)
});

router.post('/', async function(req, res){

    const text = 'INSERT INTO usuarios(id, usuario, nombres, identificacion, domicilio, correo, celular, estado, fecha_trans, usuario_creacion, contrasenia) VALUES($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11) RETURNING *'
    const values = [await getMax() + 1, req.body.usuario, req.body.nombres, req.body.identificacion, req.body.domicilio, req.body.correo, req.body.celular, req.body.estado, req.body.fecha_trans, req.body.usuario_creacion, req.body.contrasenia]
try {
    const result = await pool.query(text,values)
    res.send( result.rows[0])
} catch (error) {
    console.log(error);
    res.send({});
}
    
});

router.get('/login/:usuario', async function(req, res){
    var u= req.params.usuario;
    var query = "select * from usuarios where usuario = '"+u+"'";
    try {
        const result = await pool.query(query)
        res.send( result.rows[0])
    } catch (error) {
        res.send([]);
    }
});

router.post('/anular', async function (req, res) {
    const text = "UPDATE usuarios set estado = 'I' where id= $1 RETURNING *"
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
      const result = await pool.query("select coalesce (Max(id),1) from usuarios")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }


module.exports = router;



