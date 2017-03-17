
var models = require('../models');
var Sequelize = require('sequelize');


// Autoload el user asociado a :patientId
exports.load = function(req, res, next, patientId) {
    models.Patient.findById(patientId, { include: [ models.MedicalData ] } )
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
    
    var patient = {
      patientname: req.body.patientname, 
      lastname: req.body.lastname ,
      birthdate:req.body.birthdate,
      mobilephone:req.body.mobilephone,
      landlinephone:req.body.landlinephone,
      address:req.body.address,
      location:req.body.location,
      province:req.body.province
    };

    models.Patient.create(patient)
      .then(function(patient) {
        req.flash('success', 'Paciente creado con éxito.');
        res.redirect('/patients');
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

    req.patient.patientname  = req.body.patientname;
    req.patient.lastname  = req.body.lastname;
    req.patient.birthdate  = req.body.birthdate;
    req.patient.mobilephone  = req.body.mobilephone;
    req.patient.landlinephone  = req.body.landlinephone;
    req.patient.location  = req.body.location;
    req.patient.province  = req.body.province;


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

