var express = require('express');
var app = express();
var db = require('./config/db'); //guarda en la db

var EstudianteController = require('./routes/EstudianteController');

app.use('/estudiantes', EstudianteController);

module.exports = app;