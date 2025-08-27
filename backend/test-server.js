const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Endpoint de prueba
app.get('/test', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
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
  console.log(`Servidor de prueba ejecutándose en http://localhost:${PORT}`);
  console.log('Prueba: http://localhost:3001/test');
  console.log('VERAZ: http://localhost:3001/veraz/12345678');
});
