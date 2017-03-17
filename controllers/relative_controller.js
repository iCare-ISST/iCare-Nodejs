
var models = require('../models');
var Sequelize = require('sequelize');


// Autoload el familiar asociado a :relativetId
exports.load = function(req, res, next, relativeId) {
    models.Relative.findById(relativeId, { include: [models.Patient] })
        .then(function(relative) {
            if (relative) {
                req.relative = relative;
                next();
            } else {
                req.flash('error', 'No existe el familiar con id='+id+'.');
                next(new Error('No existe relativeId=' + relativeId));
            }
        })
        .catch(function(error) { next(error); });
};

// GET /relatives
exports.index = function(req, res, next) {
    models.Relative.findAll({order: ['name']})
        .then(function(relatives) {
            res.render('relatives/index', { relatives: relatives });
        })
        .catch(function(error) { next(error); });
};

// GET /relatives/:id
exports.show = function(req, res, next) {
    res.render('relatives/show', {relative: req.relative});
};

// GET /ralative/new
exports.new = function(req, res, next) {
    var relative = models.Relative.build({
        name: "", 
        lastname: "" ,
        mobilephone:"",
        landlinephone:"",
        address:"",
        location:"",
        province:""
    });

    res.render('relatives/new', { relative: relative });
};

// POST /relatives
exports.create = function(req, res, next) {
    
    var relative = {
      name: req.body.name, 
      lastname: req.body.lastname ,
      mobilephone:req.body.mobilephone,
      landlinephone:req.body.landlinephone,
      address:req.body.address,
      location:req.body.location,
      province:req.body.province
    };

    models.Relative.create(relative)
      .then(function(relative) {
        req.flash('success', 'Familiar creado con éxito.');
        res.redirect('/relatives');
      })
      .catch(Sequelize.ValidationError, function(error) {
        req.flash('error', 'Errores en el formulario:');
        for (var i in error.errors) {
            req.flash('error', error.errors[i].value);
        };
        res.render('relatives/new', { relative: relative });
      });
};

// GET /relative/:id/edit
exports.edit = function(req, res, next) {
    res.render('relatives/edit', { relative: req.relative });  // req.relative: instancia de relative cargada con autoload
}; 

// PUT /relatives/:id
exports.update = function(req, res, next) { 
  if (req.body.editar === 'datos') {
    req.relative.name  = req.body.name;
    req.relative.lastname  = req.body.lastname;
    req.relative.mobilephone  = req.body.mobilephone;
    req.relative.landlinephone  = req.body.landlinephone;
    req.relative.location  = req.body.location;
    req.relative.province  = req.body.province;


    req.relative.save({fields: ["name", "lastname", "mobilephone", "landlinephone", "address","location", "province"]})
        .then(function(relative) {
            req.flash('success', 'Usuario actualizado con éxito.');
            res.redirect('/relatives');  // Redirección HTTP a /
        })
        .catch(Sequelize.ValidationError, function(error) {

            req.flash('error', 'Errores en el formulario:');
            for (var i in error.errors) {
                req.flash('error', error.errors[i].value);
            };

            res.render('relatives/edit', {relative: req.relative});
        })
        .catch(function(error) {
            next(error);
        });
  } else if(req.body.editar === 'familiares') {
    models.Patient.findAll().then(function(patients) {
      req.relative.removePatients(patients);
      for(var i in patients) {
        for(var j in req.body.on) {
          if(+patients[i].id === +req.body.on[j]) {
            req.relative.addPatient(patients[i]);
          }
        }
      }
      res.redirect('/relatives');
    });
  }
};

// GET /relatives/:id/add
exports.add = function(req, res, next) {
  models.Patient.findAll({ order: ['patientname'] }).then(function(patients) {
    for(var i in patients) {
      patients[i].pertenece = 0;
      for(var j in req.relative.Patients) {
        if (patients[i].id === req.relative.Patients[j].id) {
          patients[i].pertenece = 1;
        }
      }
    }
    res.render('relatives/add', { patients: patients, relative: req.relative });
  });
};

// DELETE /users/:id
exports.destroy = function(req, res, next) {
    req.relative.destroy().then(function() {
    req.relative.getPatients().then(function(patients) {
      for(var i in patients) {
        patients[i].removeRelative(req.relative);
      }
    });
    res.redirect('/');
  }).catch(function(error) {
    next(error);
  });
};