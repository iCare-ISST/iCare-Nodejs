
var models = require('../models');
var Sequelize = require('sequelize');

// GET /patients/:patientId/medicaldata/new
exports.new = function(req, res, next) {
  var medicaldata = models.MedicalData.build({alergias: "",
                                              cardiopatias: "",
                                              cardiovasculares: "",
                                              mentales: "",
                                              gruposanguineo: "",
                                              medicacion: "",
                                              otrasafecciones: "",
                                              peso: 0,
                                              invalidez: ""
                                              });

  res.render('medicaldata/new', { medicaldata: medicaldata, 
  	                              patient: req.patient
  	                         });
};


// POST /patients/:patientId/medicalData
exports.create = function(req, res, next) {


  var medicaldata = models.MedicalData.build(
      { alergias: req.body.alergias,
        cardiopatias: req.body.cardiopatias,
        cardiovasculares: req.body.cardiovasculares,
        mentales: req.body.mentales,
        gruposanguineo: req.body.gruposanguineo,
        medicacion: req.body.medicacion,
        otrasafecciones: req.body.otrasafecciones,
        peso: req.body.peso,
        invalidez: req.body.invalidez,          
        PatientId: req.patient.id
      });

  medicaldata.save()
    .then(function(comment) {
      req.flash('success', 'Datos médicos añadidos con éxito.');
      res.redirect('/patients/' + req.patient.id);
   }) 
	  .catch(Sequelize.ValidationError, function(error) {

      req.flash('error', 'Errores en el formulario:');
      for (var i in error.errors) {
          console.log(error);
          console.log(error.errors[i]);
          console.log(error.errors[i].value);
          req.flash('error', error.errors[i].message);
      };

      res.render('medicaldata/new', { medicaldata: medicaldata,
      	                              patient:    req.patient});
    })
    .catch(function(error) {
      req.flash('error', 'Error al añadir datos: '+error.message);
		  next(error);
	  });    
};

// GET /patients/:patientsId/medicaldata/edit
exports.edit = function(req, res, next) {
    res.render('medicaldata/edit', { medicaldata: medicaldata,
                                     patient:    req.patient});  
}; 

// PUT /patients/:patientId/medicalData
exports.update = function(req, res, next) {

    req.medicaldata.alergias = req.body.alergias,
    req.medicaldata.cardiopatias = req.body.cardiopatias,
    req.medicaldata.cardiovasculares = req.body.cardiovasculares,
    req.medicaldata.mentales = req.body.mentales,
    req.medicaldata.gruposanguineo = req.body.gruposanguineo,
    req.medicaldata.medicacion = req.body.medicacion,
    req.medicaldata.otrasafecciones = req.body.otrasafecciones,
    req.medicaldata.peso = req.body.peso,
    req.medicaldata.invalidez = req.body.invalidez,          
    req.medicaldata.PatientId = req.patient.id

    req.medicaldata.save({fields: ["alergias", "cardiopatias", "cardiovasculares", "mentales", "gruposanguineo","medicacion","otrasafecciones","peso","invalidez","PatientId"]})
        .then(function(medicaldata) {
            req.flash('success', 'Datos actualizados con éxito.');
            res.redirect('/patients/' + req.patient.id);  // Redirección HTTP a /
        })
        .catch(Sequelize.ValidationError, function(error) {

            req.flash('error', 'Errores en el formulario:');
            for (var i in error.errors) {
                req.flash('error', error.errors[i].value);
            };

            res.render('medicaldata/edit', { medicaldata: medicaldata,
                                     patient:    req.patient}); 
        })
        .catch(function(error) {
            next(error);
        });
};
