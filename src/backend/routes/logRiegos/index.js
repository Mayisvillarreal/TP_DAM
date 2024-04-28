const express = require('express')
const pool = require('../../mysql-connector')
const moment = require('moment');

const routerLogRiegos = express.Router()

routerLogRiegos.get('/', function (req, res) {
    pool.query('Select * from Log_Riegos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

routerLogRiegos.get('/:electrovalvulaId', function (req, res){
    const electrovalvulaId = req.params.electrovalvulaId;
    pool.query('SELECT * FROM Log_Riegos WHERE electrovalvulaId = ?', electrovalvulaId, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})



routerLogRiegos.post('/', function (req, res) {
    const { apertura, fecha, electrovalvulaId } = req.body;

    const fechaMySQL = moment(fecha).format('YYYY-MM-DD HH:mm:ss');
    const values = [apertura, fechaMySQL, electrovalvulaId];
    pool.query('INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (?, ?, ?)', values, function (err, result) {
        if (err) {
            res.status(500).json({ error: 'Error al insertar el log riego' });
            return;
        }
        res.status(201).json({ message: 'Log riego insertado correctamente' });
    });
});


module.exports = routerLogRiegos