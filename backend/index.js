require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Cliente = require('./models/Cliente');

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

app.use(cors({
  origin: true, // Permite todos los orígenes
  credentials: true
}));
app.use(express.json());

// Endpoint para agregar cliente
app.post('/clientes', async (req, res) => {
  try {
    const { nombre, dni } = req.body;
    const cliente = new Cliente({ nombre, dni });
    await cliente.save();
    res.json(cliente);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'DNI ya registrado' });
    }
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

// Endpoint para listar clientes
app.get('/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Endpoint para buscar cliente por DNI
app.get('/clientes/:dni', async (req, res) => {
  try {
    const { dni } = req.params;
    const cliente = await Cliente.findOne({ dni });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar cliente' });
  }
});

// Endpoint para consultar al VERAZ (simulado)
app.get('/veraz/:dni', (req, res) => {
  const { dni } = req.params;
  // Simulación: si el DNI termina en número par, está habilitado; impar, rechazado
  const lastDigit = parseInt(dni[dni.length - 1], 10);
  if (isNaN(lastDigit)) {
    return res.status(400).json({ error: 'DNI inválido' });
  }
  const estado = lastDigit % 2 === 0 ? 'APROBADO' : 'RECHAZADO';
  res.json({ dni, estado });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});