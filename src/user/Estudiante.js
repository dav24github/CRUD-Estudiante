//mongo -> documentos
var mongoose = require('mongoose');

var EstudianteSchema = new mongoose.Schema({
    ci: String,
    cu: {"nro": String, "carrera": String},
    nombre: String,
    apellidos: String,
});
mongoose.model('Estudiante', EstudianteSchema);

module.exports = mongoose.model('Estudiante');