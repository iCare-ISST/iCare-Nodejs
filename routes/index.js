var express = require('express');
var router = express.Router();

var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');
var patientController = require('../controllers/patient_controller');
var medicaldataController = require('../controllers/medicaldata_controller');
/* GET home page. */
router.get('/', sessionController.loginRequired, function(req, res, next) {
  res.render('index');
});

router.param('userId', userController.load); // autoload :userId
router.param('patientId', patientController.load); // autoload :patientId

// Users
router.get('/users',                    userController.index);   // listado usuarios
router.get('/users/:userId(\\d+)',      userController.show);    // ver un usuario
router.get('/users/new',                userController.new);     // formulario sign un
router.post('/users',                   userController.create);  // registrar usuario
router.get('/users/:userId(\\d+)/edit', sessionController.loginRequired, userController.edit);     // editar información de cuenta
router.put('/users/:userId(\\d+)',      sessionController.loginRequired, userController.update);   // actualizar información de cuenta
router.delete('/users/:userId(\\d+)',   sessionController.loginRequired, userController.destroy);  // borrar cuenta

// Patients
router.get('/patients',                    patientController.index);   // listado usuarios
router.get('/patients/:patientId(\\d+)',      patientController.show);    // ver un usuario
router.get('/patients/new',                patientController.new);     // formulario sign un
router.post('/patients',                   patientController.create);  // registrar usuario
router.get('/patients/:patientId(\\d+)/edit', patientController.edit);     // editar información de cuenta
router.put('/patients/:patientId(\\d+)',      patientController.update);   // actualizar información de cuenta
router.delete('/patients/:patientsId(\\d+)',  patientController.destroy);  // borrar cuenta

//Sessions
router.get('/session',    sessionController.new);     // formulario login
router.post('/session',   sessionController.create);  // crear sesión
router.delete('/session', sessionController.destroy); // destruir sesión

//MedicalData
router.get('/patients/:patientId(\\d+)/medicaldata/new',                medicaldataController.new);     // formulario rellenar datos
router.post('/patients/:patientId(\\d+)/medicaldata',                medicaldataController.create);     // Crear datos
router.get('/patients/:patientId(\\d+)/medicaldata/edit',                medicaldataController.edit);     // formulario editar datos
router.put('/patients/:patientId(\\d+)/medicaldata',                medicaldataController.update);     // Actualizar datos

module.exports = router;
