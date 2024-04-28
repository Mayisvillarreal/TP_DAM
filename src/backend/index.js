//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;

const cors = require('cors');

var express = require('express');
var app = express();
var pool = require('./mysql-connector');
const jwt = require('jsonwebtoken')


const routerDispositivo = require('./routes/dispositivos')
const routerMediciones = require('./routes/mediciones');
const routerValvulas = require('./routes/valvulas');
const routerlogRiegos = require('./routes/logRiegos')

const YOUR_SECRET_KEY = 'mi llave'
var testUser = {username: 'test', password: '1234'}

const corsOptions = {
    origin: '*',
}

var myLogger = function (req, res, next) {
    console.log('LOGGED')
    next()
}

var authenticator = function (req, res, next) {
    let autHeader = (req.headers.authorization || '')
    if (autHeader.startsWith('Bearer ')) {
        token = autHeader.split(' ')[1]
    } else {
        res.status(401).send({ message: 'Se requiere un token de tipo Bearer' })
    }
    jwt.verify(token, YOUR_SECRET_KEY, function(err) {
      if(err) {
        res.status(403).send({ message: 'Token inválido' })
      }
    })
    next()
}

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));
app.use(cors(corsOptions))
app.use(myLogger)


app.use('/dispositivo', routerDispositivo)


app.use('/mediciones', routerMediciones)
app.use('/mediciones/:dispositivoId', routerMediciones)
app.use('/mediciones/:dispositivoId'/'ultima', routerMediciones)

app.use('/registrar-medicion', routerMediciones)


app.use('/electrovalvulas', routerValvulas)
app.use('/electrovalvulas/:electrovalvulaId', routerValvulas)

app.use('/logRiegos', routerlogRiegos)
app.use('/logRiegos/:electrovalvulaId', routerlogRiegos)

app.use('/registrar-logRiegos', routerlogRiegos)

//=======[ Main module code ]==================================================


var cb2 = function (req, res, next) {
    res.send({'mensaje': 'Hola DAM!'}).status(200)
}


app.get('/', cb2);

app.post('/login', (req, res) => {
    if (req.body) {
        var userData = req.body

        if (testUser.username === userData.username && testUser.password === userData.password) {
            var token = jwt.sign(userData, YOUR_SECRET_KEY)
            res.status(200).send({
                signed_user: userData,
                token: token
            })
        } else {
            res.status(403).send({
                errorMessage: 'Auth required'
            })
        }
    } else {
        res.status(403).send({
            errorMessage: 'Se requiere un usuario y contraseña'
        })
    }
})

app.get('/prueba', authenticator, function(req, res) {
    res.send({message: 'Está autenticado, accede a los datos'})
})

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});
