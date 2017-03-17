'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.createTable(
           'MedicalData', 
           { id: { type: Sequelize.INTEGER,  allowNull: false,
                              primaryKey: true,         autoIncrement: true,  
                              unique: true },
             PatientId: { type: Sequelize.INTEGER },
             alergias: { type: Sequelize.STRING },
             cardiopatias: { type: Sequelize.STRING },
             cardiovasculares: { type: Sequelize.STRING },
             mentales: { type: Sequelize.STRING },
             gruposanguineo: { type: Sequelize.STRING },
             medicacion: { type: Sequelize.STRING },
             otrasafecciones: { type: Sequelize.STRING },
             peso: { type: Sequelize.INTEGER },
             invalidez:  { type: Sequelize.STRING },
             createdAt: { type: Sequelize.DATE,     allowNull: false },
             updatedAt: { type: Sequelize.DATE,     allowNull: false }
           },
           { sync: {force: true}
           }
      );
  },

  down: function (queryInterface, Sequelize) {
     return queryInterface.dropTable('MedicalData');
  }
};