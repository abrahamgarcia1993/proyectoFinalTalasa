const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});

sequelize.authenticate()
.then(() => console.log("Conexión exitosa con la base de datos"))
.catch((error) => console.log("Error en la conexión con la base de datos", error));

module.exports = sequelize;