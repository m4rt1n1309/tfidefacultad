const mongoose = require('mongoose');

const creditoSchema = new mongoose.Schema({
  clienteDni: {
    type: String,
    required: true,
    trim: true
  },
  clienteNombre: {
    type: String,
    required: true,
    trim: true
  },
  monto: {
    type: Number,
    required: true
  },
  plazoMeses: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['PENDIENTE', 'APROBADO', 'RECHAZADO'],
    default: 'PENDIENTE'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Credito', creditoSchema);
