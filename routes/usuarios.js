
const express_1 = require("express");
var router = express_1.Router();
const { pool} = require('../pg')

 
router.get('/', async function(req, res){
    const result = await pool.query('select * from tb_usuarios')
    res.send( result.rows)
});

router.post('/', async function(req, res){

    const text = 'INSERT INTO tb_usuarios(id, usuario, nombres, identificacion, domicilio, correo, celular,contrasenia, estado, tipo_usuario) VALUES($1, $2, $3, $4,$5, $6, $7, $8,$9,$10) RETURNING *'
    const values = [await getMax() + 1, req.body.usuario, req.body.nombres, req.body.identificacion, req.body.domicilio, req.body.correo, req.body.celular, req.body.contrasenia, req.body.estado, req.body.tipo_usuario]
try {
    const result = await pool.query(text,values)
    res.send( result.rows[0])
} catch (error) {
    console.log(error);
    res.send({});
}
});

router.post('/update', async function(req, res){

    const text = 'update tb_usuarios set usuario = $2, nombres=$3, domicilio = $4, correo=$5,celular = $6, contrasenia=$7  where id = $1 RETURNING *'
    const values = [req.body.id, req.body.usuario, req.body.nombres, req.body.domicilio, req.body.correo, req.body.celular, req.body.contrasenia]
try {
    const result = await pool.query(text,values)
    res.send( result.rows[0])
} catch (error) {
    console.log(error);
    res.send({});
}
});

router.get('/login/:usuario/:contra', async function(req, res){
    var u= req.params.usuario;
    var c= req.params.contra;
    var query = "select * from tb_usuarios where estado ='A' and usuario = '"+u+"'"+" and contrasenia='"+c+"'";
    try {
        const result = await pool.query(query)
        res.send( result.rows[0])
    } catch (error) {
        print(error);
        res.send([]);
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
      const result = await pool.query("select coalesce (Max(id),0) from tb_usuarios")
      return result.rows[0].coalesce;
    } catch (error) {
      return 1;
    }
  
  }


module.exports = router;



