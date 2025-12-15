import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Oscar Barbieri - Electrodomésticos</h1>
      <p>Bienvenido al sistema de gestión de clientes.</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: 20 }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{ fontSize: '1.1rem', padding: '0.9rem 1.6rem' }}>
            Iniciar sesión
          </button>
        </Link>

        <Link to="/clientes" style={{ textDecoration: 'none' }}>
          <button style={{ fontSize: '1.1rem', padding: '0.9rem 1.6rem' }}>
            Gestión de Clientes
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;