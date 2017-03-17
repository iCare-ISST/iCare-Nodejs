'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Relatives', [ 
         { name: 'Luis', 
           lastname: 'García Camino',
           mobilephone: '658302756',
           landlinephone: '918930930',
           address: 'C/ Colombia 27, 1ºC',
           location: 'Madrid',
           province: 'Madrid',
           createdAt: new Date(), updatedAt: new Date() },
         { name: 'Federico', 
           lastname: 'Domínguez Pérez',
           mobilephone: '605948439',
           landlinephone: '987206873',
           address: 'C/ Reina Amàlia 3',
           location: 'Barcelona',
           province: 'Barcelona',
           createdAt: new Date(), updatedAt: new Date()  }
        ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Relatives', null, {});
  }
};
