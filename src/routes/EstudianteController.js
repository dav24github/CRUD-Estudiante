//NodeJs trabaja asincronamente
//REST
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //todo el obj se convierte en json
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Estudiante = require('../user/Estudiante'); //modelo mongo

//Recurso->user(REST->Recursos)
// CREATES A NEW USER
router.post('/', function(req, res) { //se hace un POST a user (Request, Responce) http con EXPRESS->Request= a un obj
    Estudiante.create({ //se usa user
            ci: req.body.ci,
            cu: {"nro":req.body.nro,"carrera":req.body.carrera},
            nombre: req.body.nombre,
            apellidos: req.body.apellidos
        },
        function(err, estudiantes) { //funcion asincrona que se ejecuta si hay error al grabar
            if (err) return res.status(500).send("There was a problem registering the user.")
            res.status(200).send({ mensaje: "usuario registrado" });
            //500 error, 400 no found, 200 ok
        });
});
//Es asincrona
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function(req, res, next) {
    Estudiante.find({}, function(err, estudiantes) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(estudiantes);
    });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function(req, res) {
    Estudiante.findById(req.params.id, function(err, estudiantes) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!estudiantes) return res.status(404).send("No user found.");
        res.status(200).send(estudiantes);
    });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function(req, res, next) {
    Estudiante.findByIdAndRemove(req.params.id, function(err, estudiantes) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + estudiantes.name + " was deleted.");
    });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function(req, res) {
    Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, estudiantes) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(estudiantes);
    });
});

module.exports = router;