import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch (e) { return null; }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const onChange = (e) => {
      const detail = e?.detail ?? null;
      if (detail === null) {
        setUser(null);
      } else if (typeof detail === 'object') {
        setUser(detail);
      } else {
        try { setUser(JSON.parse(localStorage.getItem('user'))); } catch (err) { setUser(null); }
      }
    };
    window.addEventListener('userChanged', onChange);
    const onStorage = () => {
      try { setUser(JSON.parse(localStorage.getItem('user'))); } catch (e) { setUser(null); }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('userChanged', onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const handleLogout = () => {
    try { localStorage.removeItem('user'); } catch (e) {}
    setUser(null);
    window.dispatchEvent(new CustomEvent('userChanged', { detail: null }));
    navigate('/');
  };

  return (
    <header style={{
      width: '100%',
      background: '#1976d2',
      color: '#fff',
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={process.env.PUBLIC_URL + '/oscarbarbieri.jpeg'} alt="Oscar" style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid #fff' }} />
        <div style={{ fontWeight: 700, fontSize: 18 }}>Oscar Barbieri - Electrodomésticos</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Nombre del usuario a la izquierda de los botones */}
        {user && (
          <div style={{ marginRight: 8, fontWeight: 600 }}>
            {`Hola, ${user.nombre}`}
          </div>
        )}

        <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px' }}>Catálogo</Link>
              {user && user.role === 'admin' && (
                <Link to="/clientes" style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px' }}>Gestión de Clientes</Link>
              )}
          <Link to="/register" style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6 }}>Registrar</Link>
          <Link to="/credito" style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px' }}>Crédito</Link>
          {!user ? (
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6 }}>Iniciar Sesión</Link>
          ) : (
            <button onClick={handleLogout} style={{ padding: '6px 10px', borderRadius: 6, border: 'none', background: '#d32f2f', color: '#fff', cursor: 'pointer' }}>Cerrar Sesión</button>
          )}
        </nav>
      </div>
    </header>
  );
}