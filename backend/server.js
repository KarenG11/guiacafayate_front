import express from "express";
import connection from "./db.js"; // importamos la conexión MySQL
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta public
app.use('/images', express.static('public/images'));

app.get("/", (req, res) => {
  res.send("Servidor backend corriendo con MySQL");
});

// Convertimos connection a promesas
const db = connection.promise();

// --- ENDPOINT ALOJAMIENTOS ---
app.get('/api/alojamientos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM alojamientos');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para comercios
app.get('/api/comercios', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM comercios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para servicios
app.get('/api/servicios', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM servicios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para traer los sponsors Oro
app.get('/api/sponsors', async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM alojamientos WHERE nivel = 'Oro' AND logo IS NOT NULL"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Servidor corriendo en http://localhost:5000'));
