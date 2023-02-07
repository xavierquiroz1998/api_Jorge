

    const express_1 = require("express");
    var router = express_1.Router();
    const { pool} = require('../pg')

    
    router.get('/', async function(req, res){
        const result = await pool.query('select * from tipoPersona')
        res.send(result.rows)
    });
 
    router.get('/report', async function(req, res){
        const result = await pool.query('select * from report_anulados')
        res.send(result.rows)
    });


    router.post('/', async function(req, res){
        const text = 'INSERT INTO tipoPersona (id, descripcion, estado)'
                                        +' VALUES($1, $2, $3,) RETURNING *'
        const values = [req.body.id, req.body.descripcion ,req.body.estado]

        try {
            const res = await pool.query(text, values)
            console.log(res.rows[0])
        } catch (err) {
            console.log(err.stack)
        }
    });



    module.exports = router;
