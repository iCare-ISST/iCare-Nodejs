console.log("ejecuta index.js --models");
var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLite:
// DATABASE_URL = sqlite:///
// DATABASE_STORAGE = quiz.sqlite
// Usar BBDD Postgres:
// DATABASE_URL = postgres:://user:passwd@host:port/database
var url, storage
if (!process.env.DATABASE_URL){
	url = "sqlite:///";
	storage = "quiz.sqlite";
}
else{
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";
}
var sequelize = new Sequelize(url,
	{ storage: storage,
		omitNull:true
}
);

// Importar la definicion de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));
var Patient = sequelize.import(path.join(__dirname,'patient'));
var Relative = sequelize.import(path.join(__dirname,'relative'));

// Relaciones
Relative.belongsToMany(Patient, { through: "RelativesPatients" });
Patient.belongsToMany(Relative, { through: "RelativesPatients" });

exports.User = User;       // exportar definición de tabla Users
exports.Patient = Patient;       // exportar definición de tabla PAtients
exports.Relative = Relative;       // exportar definición de tabla Relatives
