// Definicion del modelo Patients:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Relative',
                          { name: { type: DataTypes.STRING,
                                    validate: { notEmpty: {msg: "Falta Nombre"}}
                                  },
                            lastname: { type: DataTypes.STRING,
                                    validate: { notEmpty: {msg: "Faltan Apellidos"}}
                                  },
                            mobilephone: { type: DataTypes.STRING},
                            landlinephone: { type: DataTypes.STRING},
                            address: { type: DataTypes.STRING},
                            location: { type: DataTypes.STRING},
                            province: { type: DataTypes.STRING}
                          });
};