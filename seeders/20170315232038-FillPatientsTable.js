'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('Patients', [ 
         { patientname: 'María Luisa', 
           lastname: 'Rodriguez Camino',
           birthdate: '24-09-1929',
           mobilephone: '665475674',
           landlinephone: '918267339',
           address: 'C/ Amapolas 28, 3ºA',
           location: 'San Sebastian de los Reyes',
           province: 'Madrid',
           createdAt: new Date(), updatedAt: new Date() },
         { patientname: 'Eustaquio', 
           lastname: 'Domínguez Herrero',
           birthdate: '02-03-1935',
           mobilephone: '672345689',
           landlinephone: '987984675',
           address: 'C/ Gran via 86, 4º Derecha',
           location: 'Barcelona',
           province: 'Barcelona',
           createdAt: new Date(), updatedAt: new Date()  }
        ]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Patients', null, {});
  }
};
