import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar nombre, dni, email y password al backend (/clientes)
    fetch('http://localhost:3001/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, dni, email, password })
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Error al crear cliente');
        }
        return res.json();
      })
      .then(data => {
        Swal.fire({ icon: 'success', title: 'Registrado', text: 'Registro guardado correctamente' });
        setNombre('');
        setDni('');
        setEmail('');
        setPassword('');
      })
      .catch(err => {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message });
      });
  };

  return (
    <main style={{ maxWidth: 480, margin: '2rem auto', padding: '1rem' }}>
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Nombre</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>DNI</label>
          <input value={dni} onChange={e => setDni(e.target.value)} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%' }} required />
        </div>
        <button type="submit" style={{ padding: '0.6rem 1rem' }}>Crear cuenta</button>
      </form>
    </main>
  );
}