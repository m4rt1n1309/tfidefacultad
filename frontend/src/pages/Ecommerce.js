import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const productos = [
  { id: 1, nombre: 'Heladera Samsung', descripcion: 'Heladera No Frost 320L, eficiencia A+', precio: 1200000, marca: 'Samsung', imagen: process.env.PUBLIC_URL + '/heladera.jpg' },
  { id: 2, nombre: 'Lavarropas LG', descripcion: 'Lavarropas automático 8kg, carga frontal', precio: 560000, marca: 'LG', imagen: process.env.PUBLIC_URL + '/lavarropas.jpg' },
  { id: 3, nombre: 'Microondas BGH', descripcion: 'Microondas 20L, digital, 700W', precio: 215000, marca: 'BGH', imagen: process.env.PUBLIC_URL + '/microondas.jpg' },
  { id: 4, nombre: 'Aire Acondicionado Philco', descripcion: 'Split frío/calor 3000W', precio: 780000, marca: 'Philco', imagen: process.env.PUBLIC_URL + '/aireacondicionado.jpg' },
  { id: 5, nombre: 'Televisor Samsung 50"', descripcion: 'Smart TV 4K UHD', precio: 950000, marca: 'Samsung', imagen: process.env.PUBLIC_URL + '/televisor.jpg' },
  { id: 6, nombre: 'Cocina Longvie', descripcion: 'Cocina a gas 56cm, 4 hornallas', precio: 350000, marca: 'Longvie', imagen: process.env.PUBLIC_URL + '/cocina.jpg' },
  { id: 7, nombre: 'Licuadora Philips', descripcion: 'Licuadora 600W, vaso de vidrio', precio: 120000, marca: 'Philips', imagen: process.env.PUBLIC_URL + '/licuadora.jpg' },
  { id: 8, nombre: 'Aspiradora Atma', descripcion: 'Aspiradora sin bolsa 1600W', precio: 180000, marca: 'Atma', imagen: process.env.PUBLIC_URL + '/aspiradora.jpg' },
  { id: 9, nombre: 'Plancha Philips', descripcion: 'Plancha a vapor 2400W', precio: 85000, marca: 'Philips', imagen: process.env.PUBLIC_URL + '/plancha.jpg' },
  { id: 10, nombre: 'Cafetera Oster', descripcion: 'Cafetera automática 12 tazas', precio: 75000, marca: 'Oster', imagen: process.env.PUBLIC_URL + '/cafetera.jpeg' }
];



const Ecommerce = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  
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
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <main style={{ 
        flex: 1, 
        padding: 'clamp(16px, 3vw, 20px)', 
        maxWidth: '100%', 
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(24px, 5vw, 32px)', 
            margin: '0 0 clamp(20px, 4vw, 32px) 0',
            color: '#333',
            textAlign: 'center',
            fontWeight: 700
          }}>
            Catálogo de Productos
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(16px, 3vw, 24px)',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            padding: '0 clamp(8px, 1.5vw, 16px)'
          }}>
            {productos.map(producto => (
              <div key={producto.id} style={{
                border: '1px solid #ccc',
                borderRadius: 12,
                width: '100%',
                maxWidth: '100%',
                padding: 'clamp(16px, 3vw, 24px)',
                background: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
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
                    marginBottom: 'clamp(12px, 2vw, 16px)',
                    boxSizing: 'border-box'
                  }} 
                />
                <h2 style={{ 
                  fontSize: 'clamp(16px, 3vw, 20px)', 
                  margin: '0 0 clamp(8px, 1.5vw, 12px) 0',
                  fontWeight: 600,
                  color: '#333',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  {producto.nombre}
                </h2>
                <p style={{ 
                  fontSize: 'clamp(14px, 2.5vw, 16px)', 
                  color: '#666',
                  margin: '0 0 clamp(8px, 1.5vw, 12px) 0',
                  lineHeight: 1.4,
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  {producto.descripcion}
                </p>
                <p style={{ 
                  fontSize: 'clamp(14px, 2.5vw, 16px)', 
                  margin: '0 0 clamp(8px, 1.5vw, 12px) 0',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word'
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
                    transition: 'background-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1565c0'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#1976d2'}>
                  Comprar
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Ecommerce;