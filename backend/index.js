require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Cliente = require('./models/Cliente');
const Credito = require('./models/Credito');

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
    const { nombre, dni, email, password } = req.body;
    const cliente = new Cliente({ nombre, dni, email, password });
    await cliente.save();
    res.json(cliente);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Valor único duplicado (dni o email)' });
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

// Endpoint simple de login (sin seguridad, solo para demo)
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password requeridos' });
    }
    // Admin local hardcoded (no persistir)
    if (email === 'admin' && password === 'admin') {
      return res.json({ nombre: 'Administrador', email: 'admin', role: 'admin' });
    }
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    // Comparación simple porque el usuario pidió sin seguridad
    if (cliente.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const out = cliente.toObject();
    if (!out.role) out.role = 'user';
    res.json(out);
  } catch (error) {
    res.status(500).json({ error: 'Error en login' });
  }
});

// Endpoint para crear solicitud de crédito
app.post('/creditos', async (req, res) => {
  try {
    const { dni, monto, plazoMeses } = req.body;
    if (!dni || !monto || !plazoMeses) return res.status(400).json({ error: 'Faltan datos' });
    const cliente = await Cliente.findOne({ dni });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    const credito = new Credito({
      clienteDni: cliente.dni,
      clienteNombre: cliente.nombre,
      monto: Number(monto),
      plazoMeses: Number(plazoMeses)
    });
    await credito.save();
    res.status(201).json(credito);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear crédito' });
  }
});

// Endpoint para listar créditos por DNI
app.get('/creditos/:dni', async (req, res) => {
  try {
    const { dni } = req.params;
    const creditos = await Credito.find({ clienteDni: dni }).sort({ createdAt: -1 });
    res.json(creditos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener créditos' });
  }
});

// Listar todos los créditos (para admin)
app.get('/creditos', async (req, res) => {
  try {
    const creditos = await Credito.find().sort({ createdAt: -1 });
    res.json(creditos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener créditos' });
  }
});

// Aprobar crédito (cambiar estado a APROBADO)
app.post('/creditos/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const credito = await Credito.findById(id);
    if (!credito) return res.status(404).json({ error: 'Crédito no encontrado' });
    const force = req.query.force === 'true';
    // Buscar otros créditos adeudados (PENDIENTE o APROBADO) del mismo cliente, excluyendo el actual
    const otros = await Credito.find({ clienteDni: credito.clienteDni, _id: { $ne: credito._id }, estado: { $in: ['PENDIENTE', 'APROBADO'] } });
    if (!force && otros && otros.length > 0) {
      return res.status(409).json({ error: 'Existen otros créditos adeudados', otrosAdeudos: otros });
    }
    // Lógica de VERAZ (simulada): si el último dígito del DNI es par -> APROBADO, si es impar -> RECHAZADO
    const dni = credito.clienteDni || '';
    const lastChar = dni[dni.length - 1];
    const lastDigit = parseInt(lastChar, 10);
    if (isNaN(lastDigit)) {
      credito.estado = 'RECHAZADO';
      await credito.save();
      return res.json({ credito, veraz: { error: 'DNI inválido' }, otrosAdeudos: otros });
    }
    const estadoVeraz = lastDigit % 2 === 0 ? 'APROBADO' : 'RECHAZADO';
    credito.estado = estadoVeraz;
    await credito.save();
    res.json({ credito, veraz: { estado: estadoVeraz }, otrosAdeudos: otros });
  } catch (error) {
    res.status(500).json({ error: 'Error al aprobar crédito' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});