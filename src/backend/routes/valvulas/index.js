const express = require('express')
const pool = require('../../mysql-connector')

const routerValvulas = express.Router()

routerValvulas.get('/', function (req, res) {
    pool.query('Select * from Electrovalvulas', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})

routerValvulas.get('/:electrovalvulaId', function (req, res){
    const electrovalvulaId = req.params.electrovalvulaId;
    pool.query('SELECT * FROM Electrovalvulas WHERE electrovalvulaId = ?', electrovalvulaId, function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
})



module.exports = routerValvulas