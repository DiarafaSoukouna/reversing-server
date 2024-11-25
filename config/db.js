const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // C'est mieux de configurer aussi le mot de passe dans .env
  database: process.env.DB_NAME,
});


db.getConnection()
  .then((connection) => {
    console.log("Connexion réussie au pool de la base de données !");
    connection.release(); // Libère la connexion après le test
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données:", error);
  });

module.exports = db;
