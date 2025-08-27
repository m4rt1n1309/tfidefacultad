import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Oscar Barbieri - Electrodomésticos</h1>
      <p>Bienvenido al sistema de gestión de clientes.</p>
      <Link to="/clientes">
        <button style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
          Gestión de Clientes
        </button>
      </Link>
    </div>
  );
}

export default Home; 