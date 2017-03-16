
var models = require('../models');
var Sequelize = require('sequelize');


// Autoload el user asociado a :patientId
exports.load = function(req, res, next, patientId) {
    models.Patient.findById(patientId)
        .then(function(patient) {
            if (patient) {
                req.patient = patient;
                next();
            } else {
                req.flash('error', 'No existe el paciente con id='+id+'.');
                next(new Error('No existe patientId=' + patientId));
            }
        })
        .catch(function(error) { next(error); });
};

// GET /patients
exports.index = function(req, res, next) {
    models.Patient.findAll({order: ['patientname']})
        .then(function(patients) {
            res.render('patients/index', { patients: patients });
        })
        .catch(function(error) { next(error); });
};


// GET /patients/:id
exports.show = function(req, res, next) {
    res.render('patients/show', {patient: req.patient});
};


// GET /patient/new
exports.new = function(req, res, next) {
    var patient = models.Patient.build({ patientname: "", 
                                   lastname: "" ,
                                   birthdate:"",
                                   mobilephone:"",
                                   landlinephone:"",
                                   address:"",
                                   location:"",
                                   province:""
                               });

    res.render('patients/new', { patient: patient });
};


// POST /patients
exports.create = function(req, res, next) {
    var patient = models.Patient.build({ patientname: req.body.patient.patientname, 
                                   lastname: req.body.patient.lastname ,
                                   birthdate:req.body.patient.birthdate,
                                   mobilephone:req.body.patient.mobilephone,
                                   landlinephone:req.body.patient.landlinephone,
                                   address:req.body.patient.address,
                                   location:req.body.patient.location,
                                   province:req.body.patient.province
                               });

                // Guardar en la BBDD
                return patient.save({fields: ["patientname", "lastname", "birthdate", "mobilephone", "landlinephone", "address","location", "province"]})
                    .then(function(patient) { // Renderizar pagina de usuarios
                        req.flash('success', 'Paciente creado con éxito.');
                        res.redirect('/patients/show');
                    })
                    .catch(Sequelize.ValidationError, function(error) {
                        req.flash('error', 'Errores en el formulario:');
                        for (var i in error.errors) {
                            req.flash('error', error.errors[i].value);
                        };
                        res.render('patients/new', { patient: patient });
                    });
        
};


// GET /patient/:id/edit
exports.edit = function(req, res, next) {
    res.render('patients/edit', { patient: req.patient });  // req.patient: instancia de patient cargada con autoload
};            


// PUT /patients/:id
exports.update = function(req, res, next) {

    req.patient.patientname  = req.body.patient.patientname;
    req.patient.lastname  = req.body.patient.lastname;
    req.patient.birthdate  = req.body.patient.birthdate;
    req.patient.mobilephone  = req.body.patient.mobilephone;
    req.patient.landlinephone  = req.body.patient.landlinephone;
    req.patient.location  = req.body.patient.location;
    req.patient.province  = req.body.patient.province;


    req.patient.save({fields: ["patientname", "lastname", "birthdate", "mobilephone", "landlinephone", "address","location", "province"]})
        .then(function(patient) {
            req.flash('success', 'Usuario actualizado con éxito.');
            res.redirect('/patients');  // Redirección HTTP a /
        })
        .catch(Sequelize.ValidationError, function(error) {

            req.flash('error', 'Errores en el formulario:');
            for (var i in error.errors) {
                req.flash('error', error.errors[i].value);
            };

            res.render('patients/edit', {patient: req.patient});
        })
        .catch(function(error) {
            next(error);
        });
};


// DELETE /users/:id
exports.destroy = function(req, res, next) {
    req.patient.destroy()
};

