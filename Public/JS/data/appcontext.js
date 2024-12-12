const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'junction.proxy.rlwy.net',
    database: 'postgres',
    password: 'DVVbzQFOvdRcGFcbKSqthggefIDqGYdq', // colocar tudo no arquivo .env
    port: '22767'
})
module.exports = pool