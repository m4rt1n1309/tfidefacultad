const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-sitio.netlify.app', 'http://localhost:3000'] 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Inicializar base de datos
const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos', err);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      dni TEXT NOT NULL UNIQUE
    )`);
  }
});

// Endpoint para agregar cliente
app.post('/clientes', (req, res) => {
  const { nombre, dni } = req.body;
  db.run('INSERT INTO clientes (nombre, dni) VALUES (?, ?)', [nombre, dni], function(err) {
    if (err) {
      return res.status(400).json({ error: 'DNI ya registrado o datos inválidos' });
    }
    res.json({ id: this.lastID, nombre, dni });
  });
});

// Endpoint para listar clientes
app.get('/clientes', (req, res) => {
  db.all('SELECT * FROM clientes', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint para buscar cliente por DNI
app.get('/clientes/:dni', (req, res) => {
  const { dni } = req.params;
  db.get('SELECT * FROM clientes WHERE dni = ?', [dni], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(row);
  });
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