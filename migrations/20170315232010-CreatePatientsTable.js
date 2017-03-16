'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Patients', 
             { id: { type: Sequelize.INTEGER,
                      allowNull: false,
                      primaryKey: true,
                      autoIncrement: true,
                      unique: true },
                patientname: { type: Sequelize.STRING,
                            allowNull: false,
                            validate: { 
                              notEmpty: {msg: "Falta Patientname"}
                            } },
                lastname: {type: Sequelize.STRING,
                            allowNull: false,
                            validate: { 
                              notEmpty: {msg: "Falta lastname"}
                            }},
                birthdate: {type: Sequelize.STRING},
                mobilephone: {type: Sequelize.STRING,
                              allowNull: false},
                landlinephone: {type: Sequelize.STRING},
                address: { type: Sequelize.STRING },
                location: { type: Sequelize.STRING},
                province: { type: Sequelize.STRING},
                createdAt: { type: Sequelize.DATE,
                             allowNull: false },
                updatedAt: { type: Sequelize.DATE,
                             allowNull: false }
              },
              { sync: {force:true}
              }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Patients');
  }
};
