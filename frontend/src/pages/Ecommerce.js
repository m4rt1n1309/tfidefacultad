import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const productos = [
  {
    id: 1,
    nombre: 'Heladera Samsung',
    descripcion: 'Heladera No Frost 320L, eficiencia A+',
    precio: 1200000,
    marca: 'Samsung',
    imagen: process.env.PUBLIC_URL + '/heladera.jpg'
  },
  {
    id: 2,
    nombre: 'Lavarropas LG',
    descripcion: 'Lavarropas automático 8kg, carga frontal',
    precio: 560000,
    marca: 'LG',
    imagen: process.env.PUBLIC_URL + '/lavarropas.jpg'
  },
  {
    id: 3,
    nombre: 'Microondas BGH',
    descripcion: 'Microondas 20L, digital, 700W',
    precio: 215000,
    marca: 'BGH',
    imagen: process.env.PUBLIC_URL + '/microondas.jpg'
  },
  {
    id: 4,
    nombre: 'Aire Acondicionado Philco',
    descripcion: 'Split frío/calor 3000W',
    precio: 780000,
    marca: 'Philco',
    imagen: process.env.PUBLIC_URL + '/aireacondicionado.jpg'
  },
  {
    id: 5,
    nombre: 'Televisor Samsung 50"',
    descripcion: 'Smart TV 4K UHD',
    precio: 950000,
    marca: 'Samsung',
    imagen: process.env.PUBLIC_URL + '/televisor.jpg'
  },
  {
    id: 6,
    nombre: 'Cocina Longvie',
    descripcion: 'Cocina a gas 56cm, 4 hornallas',
    precio: 350000,
    marca: 'Longvie',
    imagen: process.env.PUBLIC_URL + '/cocina.jpg'
  },
  {
    id: 7,
    nombre: 'Licuadora Philips',
    descripcion: 'Licuadora 600W, vaso de vidrio',
    precio: 120000,
    marca: 'Philips',
    imagen: process.env.PUBLIC_URL + '/licuadora.jpg'
  },
  {
    id: 8,
    nombre: 'Aspiradora Atma',
    descripcion: 'Aspiradora sin bolsa 1600W',
    precio: 180000,
    marca: 'Atma',
    imagen: process.env.PUBLIC_URL + '/aspiradora.jpg'
  },
  {
    id: 9,
    nombre: 'Plancha Philips',
    descripcion: 'Plancha a vapor 2400W',
    precio: 85000,
    marca: 'Philips',
    imagen: process.env.PUBLIC_URL + '/plancha.jpg'
  },
  {
    id: 10,
    nombre: 'Cafetera Oster',
    descripcion: 'Cafetera automática 12 tazas',
    precio: 75000,
    marca: 'Oster',
    imagen: process.env.PUBLIC_URL + '/cafetera.jpeg'
  }
];

const Header = () => (
  <header style={{
    width: '100%',
    background: '#1976d2',
    color: '#fff',
    padding: 'clamp(12px, 2vw, 18px) clamp(16px, 3vw, 20px)',
    marginBottom: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 'clamp(10px, 2vw, 15px)',
    minHeight: 'fit-content',
    overflow: 'visible',
    boxSizing: 'border-box'
  }}>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 'clamp(10px, 2vw, 15px)', 
      minWidth: 0, 
      flexShrink: 0 
    }}>
      <img 
        src={process.env.PUBLIC_URL + '/oscarbarbieri.jpeg'} 
        alt="Oscar Barbieri" 
        style={{
          width: 'clamp(40px, 8vw, 50px)',
          height: 'clamp(40px, 8vw, 50px)',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '3px solid #fff',
          flexShrink: 0
        }}
      />
      <div style={{ 
        fontSize: 'clamp(16px, 4vw, 24px)', 
        fontWeight: 700, 
        letterSpacing: 1,
        whiteSpace: 'nowrap'
      }}>
        Oscar Barbieri
      </div>
    </div>

    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      gap: 'clamp(8px, 2vw, 12px)',
      flexWrap: 'wrap'
    }}>
      <Link to="/clientes" style={{
        color: '#fff',
        textDecoration: 'none',
        padding: 'clamp(6px, 1.5vw, 10px) clamp(12px, 2.5vw, 16px)',
        borderRadius: 6,
        background: 'rgba(255,255,255,0.1)',
        fontSize: 'clamp(14px, 2.5vw, 16px)',
        fontWeight: 500,
        transition: 'background-color 0.2s'
      }}
      onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
      onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}>
        Gestión de Clientes
      </Link>
    </div>
  </header>
);

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
      {/* Información de Contacto */}
      <div>
        <h3 style={{ marginTop: 0, marginBottom: 15, color: '#1976d2' }}>Contacto</h3>
        <p style={{ margin: '8px 0' }}>📞 (011) 1234-5678</p>
        <p style={{ margin: '8px 0' }}>📧 info@oscarbarbieri.com</p>
        <p style={{ margin: '8px 0' }}>📍 Av. Corrientes 1234, CABA</p>
        <p style={{ margin: '8px 0' }}>🕒 Lun-Vie: 9:00-18:00</p>
      </div>

      {/* Enlaces Útiles */}
      <div>
        <h3 style={{ marginTop: 0, marginBottom: 15, color: '#1976d2' }}>Enlaces Útiles</h3>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>🏠 Inicio</p>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>📋 Catálogo</p>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>❓ Preguntas Frecuentes</p>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>📞 Soporte Técnico</p>
        <p style={{ margin: '8px 0', cursor: 'pointer' }}>📋 Términos y Condiciones</p>
      </div>

      {/* Redes Sociales */}
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

      {/* Newsletter */}
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

    {/* Línea divisoria */}
    <div style={{
      borderTop: '1px solid #444',
      margin: '30px 0 20px 0',
      padding: '0 20px'
    }} />

    {/* Copyright */}
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

const Ecommerce = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
  // Agregar estilos CSS para las animaciones
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: rotate(15deg) scale(1); }
        50% { transform: rotate(15deg) scale(1.1); }
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: rotate(15deg) translateY(0); }
        40% { transform: rotate(15deg) translateY(-10px); }
        60% { transform: rotate(15deg) translateY(-5px); }
      }
      @keyframes rotate {
        from { transform: rotate(15deg); }
        to { transform: rotate(375deg); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const banners = [
    {
      id: 1,
      title: '¡OFERTAS INCREÍBLES!',
      description: 'Descuentos de hasta 40% en electrodomésticos seleccionados',
      buttonText: 'Ver Ofertas',
      gradient: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
      badge: '🔥',
      badgeColor: '#ff6b6b',
      animation: 'pulse'
    },
    {
      id: 2,
      title: 'COMPRA EN CUOTAS',
      description: 'Hasta 12 cuotas sin interés con tarjeta de crédito',
      buttonText: 'Más Info',
      gradient: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
      badge: '💳',
      badgeColor: '#4ecdc4',
      animation: 'bounce'
    },
    {
      id: 3,
      title: 'OFERTA ESPECIAL',
      description: 'Heladera Samsung con descuento especial',
      buttonText: 'Comprar Ahora',
      gradient: 'linear-gradient(135deg, #feca57, #ff9ff3)',
      badge: '⭐',
      badgeColor: '#feca57',
      animation: 'rotate',
      hasProduct: true,
      productImage: '/heladera.jpg',
      productName: 'Heladera Samsung',
      oldPrice: '$1,500,000',
      newPrice: '$1,200,000'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  const goToBanner = (index) => {
    setCurrentBanner(index);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f5f5', 
      display: 'flex', 
      flexDirection: 'column',
      overflowX: 'hidden',
      width: '100%'
    }}>
      <Header />
      <main style={{ 
        flex: 1, 
        padding: 'clamp(16px, 3vw, 20px)', 
        maxWidth: '100%', 
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: 'clamp(20px, 5vw, 32px)',
          fontWeight: 700,
          color: '#333',
          marginBottom: 'clamp(24px, 4vw, 40px)',
          marginTop: 0,
          padding: '0 clamp(16px, 3vw, 32px)'
        }}>
          Venta de Electrodomésticos
        </h1>

        {/* Carrusel de Banners Promocionales */}
        <div style={{
          position: 'relative',
          height: 'clamp(200px, 30vw, 300px)',
          marginBottom: 40,
          overflow: 'hidden',
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: banner.gradient,
                color: '#fff',
                padding: 'clamp(20px, 4vw, 30px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'opacity 0.5s ease-in-out',
                opacity: currentBanner === index ? 1 : 0,
                zIndex: currentBanner === index ? 2 : 1
              }}
            >
              <div style={{
                position: 'absolute',
                top: 15,
                right: 15,
                background: '#fff',
                color: banner.badgeColor,
                padding: '8px 12px',
                borderRadius: '50%',
                fontSize: 12,
                fontWeight: 'bold',
                transform: 'rotate(15deg)',
                animation: `${banner.animation} 2s infinite`
              }}>
                {banner.badge}
              </div>
              
              <h2 style={{ 
                fontSize: 'clamp(24px, 5vw, 36px)', 
                margin: '0 0 15px 0',
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
                {banner.title}
              </h2>
              
              {banner.hasProduct ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 20,
                  marginBottom: 20
                }}>
                  <img 
                    src={process.env.PUBLIC_URL + banner.productImage} 
                    alt={banner.productName} 
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      objectFit: 'cover',
                      border: '3px solid #fff',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}
                  />
                  <div>
                    <h3 style={{ 
                      fontSize: 'clamp(20px, 4vw, 28px)', 
                      margin: '0 0 10px 0',
                      fontWeight: 700,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      {banner.productName}
                    </h3>
                    <p style={{ 
                      fontSize: 'clamp(14px, 2.5vw, 18px)', 
                      margin: 0,
                      opacity: 0.9
                    }}>
                      <span style={{ textDecoration: 'line-through', opacity: 0.7 }}>{banner.oldPrice}</span>
                      <span style={{ fontWeight: 'bold', marginLeft: 10 }}>{banner.newPrice}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <p style={{ 
                  fontSize: 'clamp(16px, 3vw, 20px)', 
                  margin: '0 0 20px 0',
                  opacity: 0.9,
                  maxWidth: '80%'
                }}>
                  {banner.description}
                </p>
              )}
              
              <button style={{
                background: '#fff',
                color: banner.badgeColor,
                border: 'none',
                padding: '12px 24px',
                borderRadius: 25,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                {banner.buttonText}
              </button>
            </div>
          ))}

          {/* Indicadores de navegación */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 10,
            zIndex: 3
          }}>
            {banners.map((_, index) => (
              <div
                key={index}
                onClick={() => goToBanner(index)}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#fff',
                  cursor: 'pointer',
                  opacity: currentBanner === index ? 1 : 0.5,
                  transition: 'opacity 0.3s'
                }}
              />
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(16px, 3vw, 32px)',
          maxWidth: '100%',
          padding: '0 clamp(16px, 3vw, 32px)'
        }}>
          {productos.map(producto => (
            <div key={producto.id} style={{
              border: '1px solid #ccc',
              borderRadius: 12,
              width: '100%',
              padding: 'clamp(16px, 3vw, 24px)',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-4px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
            }}>
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                style={{ 
                  width: '100%', 
                  height: 'clamp(150px, 25vw, 200px)', 
                  objectFit: 'contain', 
                  borderRadius: 8, 
                  background: '#f9f9f9', 
                  padding: 8,
                  marginBottom: 'clamp(12px, 2vw, 16px)'
                }} 
              />
              <h2 style={{ 
                fontSize: 'clamp(16px, 3vw, 20px)', 
                margin: '0 0 clamp(8px, 1.5vw, 12px) 0',
                fontWeight: 600,
                color: '#333'
              }}>
                {producto.nombre}
              </h2>
              <p style={{ 
                fontSize: 'clamp(14px, 2.5vw, 16px)', 
                color: '#666',
                margin: '0 0 clamp(8px, 1.5vw, 12px) 0',
                lineHeight: 1.4
              }}>
                {producto.descripcion}
              </p>
              <p style={{ 
                fontSize: 'clamp(14px, 2.5vw, 16px)', 
                margin: '0 0 clamp(8px, 1.5vw, 12px) 0'
              }}>
                <b>Marca:</b> {producto.marca}
              </p>
              <p style={{ 
                fontSize: 'clamp(16px, 3vw, 18px)', 
                fontWeight: 700,
                color: '#1976d2',
                margin: '0 0 clamp(12px, 2vw, 16px) 0'
              }}>
                <b>Precio:</b> ${producto.precio.toLocaleString('es-AR')}
              </p>
              <Link 
                to={`/producto/${producto.id}`} 
                style={{ 
                  display: 'inline-block', 
                  width: '100%',
                  padding: 'clamp(10px, 2vw, 14px) clamp(16px, 3vw, 24px)', 
                  background: '#1976d2', 
                  color: '#fff', 
                  borderRadius: 8, 
                  textDecoration: 'none',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#1565c0'}
                onMouseLeave={(e) => e.target.style.background = '#1976d2'}>
                Comprar
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ecommerce; 