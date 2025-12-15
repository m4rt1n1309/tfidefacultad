import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch (e) { return null; }
  });
  const [menuOpen, setMenuOpen] = useState(false);
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
    setMenuOpen(false);
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
      boxSizing: 'border-box',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src={process.env.PUBLIC_URL + '/oscarbarbieri.jpeg'} alt="Oscar" style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid #fff' }} />
        <div style={{ fontWeight: 700, fontSize: 18, minWidth: 0 }}>Oscar Barbieri - Electrodomésticos</div>
      </div>

      {/* Botón hamburguesa en móviles */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'transparent',
          border: 'none',
          color: '#fff',
          fontSize: 24,
          cursor: 'pointer',
          '@media (maxWidth: 768px)': { display: 'block' }
        }}
        className="hamburguesa-btn"
      >
        ☰
      </button>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 12,
        width: '100%',
        justifyContent: 'flex-end',
        '@media (maxWidth: 768px)': menuOpen ? { display: 'flex' } : { display: 'none' },
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        alignItems: window.innerWidth <= 768 ? 'flex-start' : 'center'
      }}>
        {/* Nombre del usuario a la izquierda de los botones */}
        {user && (
          <div style={{ marginRight: 8, fontWeight: 600 }}>
            {`Hola, ${user.nombre}`}
          </div>
        )}

        <nav style={{ 
          display: 'flex', 
          gap: 12, 
          alignItems: 'center',
          flexDirection: window.innerWidth <= 768 && menuOpen ? 'column' : 'row',
          alignItems: window.innerWidth <= 768 && menuOpen ? 'flex-start' : 'center',
          width: window.innerWidth <= 768 && menuOpen ? '100%' : 'auto'
        }}>
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px' }}>Catálogo</Link>
              {user && user.role === 'admin' && (
                <Link to="/clientes" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px' }}>Gestión de Clientes</Link>
              )}
          <Link to="/register" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6 }}>Registrar</Link>
          <Link to="/credito" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px' }}>Crédito</Link>
          {!user ? (
            <Link to="/login" onClick={() => setMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6 }}>Iniciar Sesión</Link>
          ) : (
            <button onClick={handleLogout} style={{ padding: '6px 10px', borderRadius: 6, border: 'none', background: '#d32f2f', color: '#fff', cursor: 'pointer' }}>Cerrar Sesión</button>
          )}
        </nav>
      </div>

      {/* Estilos responsive */}
      <style>{`
        @media (max-width: 768px) {
          .hamburguesa-btn { display: block !important; }
          header > div:nth-child(3) { 
            width: 100%;
            display: ${menuOpen ? 'flex' : 'none'} !important;
            flex-direction: column;
            align-items: flex-start;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid rgba(255,255,255,0.2);
          }
          header > div:nth-child(3) nav { 
            flex-direction: column;
            width: 100%;
            align-items: flex-start !important;
          }
          header > div:nth-child(3) nav a,
          header > div:nth-child(3) nav button {
            width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </header>
  );
}