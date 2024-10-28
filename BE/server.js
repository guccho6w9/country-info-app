// index.js (o server.js)
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./api"); // Asegúrate de que esté importando el archivo correcto

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000' // Permitir solo el frontend en este origen
}));
app.use(express.json()); // Para poder parsear JSON en el cuerpo de las peticiones

// Usa las rutas de la API
app.use("/api", apiRoutes); // Conectar rutas de la API

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
