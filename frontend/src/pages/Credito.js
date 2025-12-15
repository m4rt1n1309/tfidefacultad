import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? 'https://tfide-backend.onrender.com' : 'http://localhost:3001');

export default function Credito() {
  const [user, setUser] = useState(null);
  const [monto, setMonto] = useState('');
  const [plazo, setPlazo] = useState('');
  const [creditos, setCreditos] = useState([]);

  useEffect(() => {
    try { const u = JSON.parse(localStorage.getItem('user')); setUser(u); } catch (e) { setUser(null); }
  }, []);

  useEffect(() => {
    if (user) fetchCreditos();
  }, [user]);

  const fetchCreditos = async () => {
    try {
      const res = await fetch(`${API_URL}/creditos/${encodeURIComponent(user.dni)}`);
      if (res.ok) {
        const data = await res.json();
        setCreditos(data);
      }
    } catch (e) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({ icon: 'warning', title: 'Inicia sesión', text: 'Debes iniciar sesión para solicitar crédito' });
      return;
    }
    try {
      const res = await fetch(`${API_URL}/creditos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni: user.dni, monto, plazoMeses: plazo })
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Error al solicitar crédito');
      Swal.fire({ icon: 'success', title: 'Solicitud enviada', text: 'Tu solicitud de crédito fue registrada' });
      setMonto(''); setPlazo('');
      fetchCreditos();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message });
    }
  };

  if (!user) {
    return (
      <main style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
        <h2>Solicitar Crédito</h2>
        <p>Debes iniciar sesión para solicitar un crédito.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
      <h2>Solicitar Crédito</h2>
      <p>Usuario: <strong>{user.nombre}</strong> (DNI: {user.dni})</p>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>Monto solicitado</label>
          <input type="number" value={monto} onChange={e => setMonto(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Plazo (meses)</label>
          <input type="number" value={plazo} onChange={e => setPlazo(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <button type="submit">Enviar solicitud</button>
      </form>

      <section>
        <h3>Solicitudes anteriores</h3>
        {creditos.length === 0 ? (
          <div>No hay solicitudes registradas.</div>
        ) : (
          <ul>
            {creditos.map(c => (
              <li key={c._id}>{c.createdAt ? new Date(c.createdAt).toLocaleString() : ''} — Monto: {c.monto} — Plazo: {c.plazoMeses} meses — Estado: {c.estado}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
