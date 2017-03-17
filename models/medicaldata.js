
// Definicion del modelo MedicalData:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MedicalData',
                          { alergias: { type: DataTypes.STRING
                          	      },
                            cardiopatias: { type: DataTypes.STRING
                                  },
                            cardiovasculares: { type: DataTypes.STRING
                                  },
                            mentales: { type: DataTypes.STRING
                                  },
                            gruposanguineo: { type: DataTypes.STRING
                                  },
                            medicacion: { type: DataTypes.STRING
                                  },
                            otrasafecciones: { type: DataTypes.STRING
                                  },
                            peso: { type: DataTypes.INTEGER
                                  },
                            invalidez: { type: DataTypes.STRING
                                  }
                          });
};