// backend/db.js
import mysql from "mysql2";

// Configuración de la conexión
const connection = mysql.createConnection({
  host: "localhost",       // tu servidor MySQL
  user: "root",            // tu usuario MySQL
  password: "Cafayate2026!",  //process.env.MYSQL_PASSWORD, la contraseña que pusiste al instalar
  database: "guia_cafayate"   // la base de datos que vamos a crear
});

// Conectamos
connection.connect(err => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
  } else {
    console.log("Conectado a MySQL correctamente!");
  }
});

export default connection;
