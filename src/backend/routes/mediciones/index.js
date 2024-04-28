const express = require('express')
const pool = require('../../mysql-connector')
const moment = require('moment');

const routerMediciones = express.Router()

routerMediciones.get('/', function (req, res) {
    pool.query('Select * from Mediciones', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

routerMediciones.get('/:dispositivoId', function (req, res){
    const dispositivoId = req.params.dispositivoId;
    pool.query('SELECT * FROM Mediciones WHERE dispositivoId = ?', dispositivoId, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

routerMediciones.get('/:dispositivoId/ultima', function (req, res){
    const dispositivoId = req.params.dispositivoId;
    pool.query('SELECT * FROM Mediciones WHERE dispositivoId = ? ORDER BY fecha DESC LIMIT 1', dispositivoId, function(err, result, fields){
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

routerMediciones.post('/', function (req, res) {
    const { fecha, valor, dispositivoId } = req.body;

    const fechaMySQL = moment(fecha).format('YYYY-MM-DD HH:mm:ss');
    const values = [fechaMySQL, valor, dispositivoId];
    pool.query('INSERT INTO Mediciones (fecha, valor, dispositivoId) VALUES (?, ?, ?)', values, function (err, result) {
        if (err) {
            res.status(500).json({ error: 'Error al insertar la medicion' });
            return;
        }
        res.status(201).json({ message: 'Medicion insertada correctamente' });
    });
});


module.exports = routerMediciones