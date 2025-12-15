import React from 'react';

const Footer = () => (
  <footer style={{
    width: '100%',
    background: '#222',
    color: '#fff',
    padding: '40px 0 20px 0',
    marginTop: 40,
    fontSize: 14
  }}>
    <div style={{
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 30
    }}>
      <div>
        <h3 style={{ marginTop: 0, marginBottom: 15, color: '#1976d2' }}>Contacto</h3>
        <p style={{ margin: '8px 0' }}>📞 (011) 1234-5678</p>
        <p style={{ margin: '8px 0' }}>📧 info@oscarbarbieri.com</p>
        <p style={{ margin: '8px 0' }}>📍 Av. Corrientes 1234, CABA</p>
        <p style={{ margin: '8px 0' }}>🕒 Lun-Vie: 9:00-18:00</p>
      </div>

      <div>
        <h3 style={{ marginTop: 0, marginBottom: 15, color: '#1976d2' }}>Enlaces Útiles</h3>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>🏠 Inicio</p>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>📋 Catálogo</p>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>❓ Preguntas Frecuentes</p>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>📞 Soporte Técnico</p>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>📋 Términos y Condiciones</p>
      </div>

      <div>
        <h3 style={{ marginTop: 0, marginBottom: 15, color: '#1976d2' }}>Síguenos</h3>
        <div style={{ display: 'flex', gap: 15, marginBottom: 15 }}>
          <button style={{
            background: '#1877f2',
            border: 'none',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 16,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            📘
          </button>
          <button style={{
            background: '#1da1f2',
            border: 'none',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 16,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            🐦
          </button>
          <button style={{
            background: '#e4405f',
            border: 'none',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 16,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            📷
          </button>
          <button style={{
            background: '#0077b5',
            border: 'none',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 16,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            💼
          </button>
        </div>
        <p style={{ margin: '8px 0', fontSize: 12, opacity: 0.8 }}>
          Facebook, Twitter, Instagram, LinkedIn
        </p>
      </div>

      <div>
        <h3 style={{ marginTop: 0, marginBottom: 15, color: '#1976d2' }}>Newsletter</h3>
        <p style={{ marginBottom: 10, fontSize: 12, opacity: 0.8 }}>
          Suscríbete para recibir ofertas especiales
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="email"
            placeholder="Tu email"
            style={{
              padding: '8px 12px',
              borderRadius: 4,
              border: 'none',
              flex: 1,
              fontSize: 12
            }}
          />
          <button style={{
            background: '#1976d2',
            border: 'none',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 12
          }}>
            Suscribir
          </button>
        </div>
      </div>
    </div>

    <div style={{
      borderTop: '1px solid #444',
      margin: '30px 0 20px 0',
      padding: '0 20px'
    }} />

    <div style={{
      textAlign: 'center',
      padding: '0 20px',
      opacity: 0.8
    }}>
      <p style={{ margin: '0 0 10px 0' }}>
        © {new Date().getFullYear()} Oscar Barbieri - Venta de Electrodomésticos. Todos los derechos reservados.
      </p>
      <p style={{ margin: 0, fontSize: 12 }}>
        Desarrollado con ❤️ para ofrecer la mejor experiencia de compra
      </p>
    </div>
  </footer>
);

export default Footer;
