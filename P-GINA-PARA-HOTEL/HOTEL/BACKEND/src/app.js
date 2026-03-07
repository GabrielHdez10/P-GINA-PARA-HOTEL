const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba para saber si el servidor vive
app.get('/', (req, res) => {
    res.send('El servidor del Hotel Paradiso está despierto 🏨');
});

// Ruta para las reservas
app.post('/api/reservas', (req, res) => {
    console.log('Reserva recibida:', req.body);
    res.json({ success: true, message: '¡Disponibilidad confirmada!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
