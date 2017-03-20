var express = require('express');
var router = express.Router();

var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');
var patientController = require('../controllers/patient_controller');
var relativeController = require('../controllers/relative_controller');
var medicaldataController = require('../controllers/medicaldata_controller');

/* GET home page. */
router.get('/', sessionController.loginRequired, function(req, res, next) {
  res.render('index');
});

router.param('userId', userController.load); // autoload :userId
router.param('patientId', patientController.load); // autoload :patientId
router.param('relativeId', relativeController.load); // autoload :relativeId

// Users
router.get('/users',                	sessionController.loginRequired, sessionController.adminRequired, userController.index);   // listado usuarios
router.get('/users/:userId(\\d+)',      sessionController.loginRequired, sessionController.adminOrMyselfRequired, userController.show);    // ver un usuario
router.get('/users/new',                sessionController.loginRequired, sessionController.adminRequired, userController.new);     // formulario sign un
router.post('/users',                   sessionController.loginRequired, sessionController.adminRequired, userController.create);  // registrar usuario
router.get('/users/:userId(\\d+)/edit', sessionController.loginRequired, sessionController.adminOrMyselfRequired, userController.edit);     // editar información de cuenta
router.put('/users/:userId(\\d+)',      sessionController.loginRequired, sessionController.adminOrMyselfRequired, userController.update);   // actualizar información de cuenta
router.delete('/users/:userId(\\d+)',   sessionController.loginRequired, sessionController.adminAndNotMyselfRequired, userController.destroy);  // borrar cuenta

// Patients
router.get('/patients',                    sessionController.loginRequired, patientController.index);   // listado usuarios
router.get('/patients/:patientId(\\d+)',   sessionController.loginRequired, patientController.show);    // ver un usuario
router.get('/patients/new',                sessionController.loginRequired, patientController.new);     // formulario sign un
router.post('/patients',                   sessionController.loginRequired, patientController.create);  // registrar usuario
router.get('/patients/:patientId(\\d+)/edit', sessionController.loginRequired, patientController.edit);     // editar información de cuenta
router.put('/patients/:patientId(\\d+)',      sessionController.loginRequired, patientController.update);   // actualizar información de cuenta
router.delete('/patients/:patientId(\\d+)',  sessionController.loginRequired, patientController.destroy);  // borrar cuenta

//Sessions
router.get('/session',    sessionController.new);     // formulario login
router.post('/session',   sessionController.create);  // crear sesión
router.delete('/session', sessionController.destroy); // destruir sesión


// Relatives
router.get('/relatives/',                           sessionController.loginRequired, relativeController.index);  // Crear familiar
router.get('/relatives/:relativeId(\\d+)',          sessionController.loginRequired, relativeController.show);    // ver un usuario
router.get('/relatives/new/',                       sessionController.loginRequired, relativeController.new);  // Crear familiar
router.get('/relatives/:relativeId(\\d+)/edit',     sessionController.loginRequired, relativeController.edit);     // editar información del familiar
router.put('/relatives/:relativeId(\\d+)',          sessionController.loginRequired, relativeController.update);   // Actualizar familiar
router.post('/relatives',                           sessionController.loginRequired, relativeController.create);  // registrar familiar
router.get('/relatives/:relativeId(\\d+)/add',      sessionController.loginRequired, relativeController.add);    // Añadir paciente familiar
router.delete('/relatives/:relativeId(\\d+)',       sessionController.loginRequired, relativeController.destroy);  // borrar cuenta

//MedicalData
router.get('/patients/:patientId(\\d+)/medicaldata/new',     sessionController.loginRequired, medicaldataController.new);     // formulario rellenar datos
router.post('/patients/:patientId(\\d+)/medicaldata',        sessionController.loginRequired, medicaldataController.create);     // Crear datos
router.get('/patients/:patientId(\\d+)/medicaldata/edit',    sessionController.loginRequired, medicaldataController.edit);     // formulario editar datos
router.put('/patients/:patientId(\\d+)/medicaldata',         sessionController.loginRequired, medicaldataController.update);     // Actualizar datos


module.exports = router;
