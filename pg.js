
const {Pool} = require('pg')



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DB_tennis_club',
    password: '12345',
    port: 5432,
})


module.exports={
    pool
}

