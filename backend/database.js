const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'db4free.net',
    user: 'ezecell',
    password: '44376073',
    database: 'ezecell',
});

module.exports = pool.promise();
