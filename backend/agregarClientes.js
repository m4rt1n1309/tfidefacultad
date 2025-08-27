const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos', err);
    return;
  }
  
  console.log('Conectado a la base de datos SQLite');
  
  // Agregar clientes de prueba
  const clientes = [
    { nombre: 'Juan Pérez', dni: '12345678' },
    { nombre: 'María García', dni: '87654321' },
    { nombre: 'Carlos López', dni: '11223344' },
    { nombre: 'Ana Martínez', dni: '55667788' },
    { nombre: 'Luis Rodríguez', dni: '99887766' }
  ];
  
  clientes.forEach(cliente => {
    db.run('INSERT OR IGNORE INTO clientes (nombre, dni) VALUES (?, ?)', 
      [cliente.nombre, cliente.dni], 
      function(err) {
        if (err) {
          console.error('Error al insertar cliente:', err);
        } else {
          if (this.changes > 0) {
            console.log(`Cliente agregado: ${cliente.nombre} - DNI: ${cliente.dni}`);
          } else {
            console.log(`Cliente ya existe: ${cliente.nombre} - DNI: ${cliente.dni}`);
          }
        }
      }
    );
  });
  
  // Cerrar la conexión después de un tiempo
  setTimeout(() => {
    db.close();
    console.log('Base de datos cerrada');
  }, 2000);
}); 