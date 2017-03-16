'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('RelativesPatients', 
              { id: {
                          type: Sequelize.INTEGER,
                          allowNull: false,
                        },
                RelativeId: {
                                type: Sequelize.INTEGER,
                                allowNull: false,
                              },                
                createdAt: {
                              type: Sequelize.DATE,
                              allowNull: false
                           },
                updatedAt: { 
                              type: Sequelize.DATE,
                              allowNull: false
                           }
              },
              { sync: {
                        force:true
                      }
              }
      );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('RelativesPatients');
  }
};