import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch((process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? 'https://tfide-backend.onrender.com' : 'http://localhost:3001')) + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(async res => {
        const body = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(body.error || 'Error al iniciar sesión');
        return body;
      })
      .then(user => {
        // Guardar usuario en localStorage y notificar al Header
        try { localStorage.setItem('user', JSON.stringify(user)); } catch (e) {}
        window.dispatchEvent(new CustomEvent('userChanged', { detail: user }));
        Swal.fire({ icon: 'success', title: 'Bienvenido', text: `Hola ${user.nombre}` });
        setEmail('');
        setPassword('');
        navigate('/');
      })
      .catch(err => {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message });
      });
  };

  return (
    <main style={{ maxWidth: 480, margin: '2rem auto', padding: '1rem' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Email (o escribe admin)</label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%' }} required />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%' }} required />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}