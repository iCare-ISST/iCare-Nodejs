
// Definicion del modelo Patients:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Patient',
                          { patientname: { type: DataTypes.STRING,
                          	        validate: { notEmpty: {msg: "Falta Nombre"}}
                          	      },
                            lastname: { type: DataTypes.STRING,
    	                            validate: { notEmpty: {msg: "Faltan Apellidos"}}
                                  },
                            birthdate: { type: DataTypes.STRING},
                            mobilephone: { type: DataTypes.STRING},
                            landlinephone: { type: DataTypes.STRING},
                            address: { type: DataTypes.STRING},
                            location: { type: DataTypes.STRING},
                            province: { type: DataTypes.STRING}
                          });
};