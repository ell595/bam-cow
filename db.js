const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'digdug',
    host: 'localhost',
    port: 5432,
    database: 'Bam_Cow'
});

module.exports = pool;