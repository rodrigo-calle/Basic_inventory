const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');//destructuración, solo llama al objeto

const pool = mysql.createPool(database);

pool.getConnection((e, connection) => {
    if(e){
        if(e.code === "PROTOCOL_CONNECTION_LOST"){
            console.error('DATABASE CONNECTION WAS CLOSED');
        };
        if(e.code === "ER_CON_COUNT_ERROR"){
            console.error('DATABASE HAS TO MANY CONNECTION ');
        };
        if(e.code === "ECONNEREFUSED"){
            console.error('DATABASE CONNECTION WAS REFUSED');
        };
    };

    if(connection)connection.release();
    console.log('DB is Connecteddd');
});

//Promisify pool querys
pool.query = promisify(pool.query);

module.exports = {
    pool,
}