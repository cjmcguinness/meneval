const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
connectionString: 'postgresql://postgres:admin123@localhost:5432/menevaldb'
    /* the following code works except for the user, which takes the 
    OS user, not the user set in .env 

    user: process.env.DBUSER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.DBPORT
    */
})

module.exports = pool