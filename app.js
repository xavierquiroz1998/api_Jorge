const express = require('express')
var app = express()
const usuarios = require('./routes/usuarios')
const persona = require('./routes/personas')
const tipopersona = require('./routes/tipoPersona')
const menu = require('./routes/menu')
const factura = require('./routes/facturas')
const tb_disciplina = require('./routes/disciplinas')
const tb_catalogo = require('./routes/catalogo')
const horario = require('./routes/horarios')
const profesor = require('./routes/profesor')
const body_parser = require('body-parser');
const cors = require('cors');

app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }));

app.use(cors());

app.use('/usuarios', usuarios);
app.use('/personas', persona);
app.use('/tipoPersona', tipopersona);
app.use('/menu', menu); 
app.use('/facturas', factura);
app.use('/disciplinas', tb_disciplina);
app.use('/catalogos', tb_catalogo);
app.use('/horarios', horario);
app.use('/profesor', profesor);

//app.use( express.static('public') );



app.listen(process.env.PORT || 8000)
console.log('servidor', process.env.PORT || 8000)


