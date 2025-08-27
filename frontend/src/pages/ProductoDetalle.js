import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    padding: '18px 20px',
    marginBottom: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 15,
    minHeight: 'fit-content',
    overflow: 'visible',
    boxSizing: 'border-box'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 15, minWidth: 0, flexShrink: 0 }}>
      <img 
        src={process.env.PUBLIC_URL + '/oscarbarbieri.jpeg'} 
        alt="Oscar Barbieri" 
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '3px solid #fff',
          flexShrink: 0
        }}
      />
      <div style={{ 
        fontSize: 'clamp(18px, 4vw, 24px)', 
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
      gap: 'clamp(10px, 2vw, 20px)',
      flexWrap: 'wrap',
      justifyContent: 'center',
      flex: 1,
      minWidth: 0
    }}>
      <div style={{ position: 'relative', minWidth: 0 }}>
        <input
          type="text"
          placeholder="Buscar productos..."
          style={{
            padding: '8px 12px',
            borderRadius: 20,
            border: 'none',
            width: 'clamp(150px, 20vw, 200px)',
            fontSize: 14
          }}
        />
        <button
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#666',
            cursor: 'pointer'
          }}
        >
          🔍
        </button>
      </div>

      <nav style={{ 
        display: 'flex', 
        gap: 'clamp(8px, 1.5vw, 15px)',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            cursor: 'pointer',
            padding: '6px 12px',
            borderRadius: 4,
            transition: 'background-color 0.2s',
            whiteSpace: 'nowrap',
            minWidth: 'fit-content'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Catálogo
        </button>
        <button
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid #fff',
            color: '#fff',
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: 4,
            transition: 'background-color 0.2s',
            whiteSpace: 'nowrap',
            minWidth: 'fit-content',
            overflow: 'visible'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
        >
          Iniciar Sesión
        </button>
      </nav>
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

const ModalCuotas = ({ isOpen, onClose, onSubmit, producto }) => {
  const [cuotasSeleccionadas, setCuotasSeleccionadas] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cuotasSeleccionadas);
  };

  const calcularInteres = (cuotas) => {
    switch(cuotas) {
      case 3: return 0.15;
      case 6: return 0.30;
      case 12: return 0.50;
      default: return 0.15;
    }
  };

  const calcularPrecioFinal = (precio, cuotas) => {
    const interes = calcularInteres(cuotas);
    return precio * (1 + interes);
  };

  const calcularCuotaMensual = (precioFinal, cuotas) => {
    return precioFinal / cuotas;
  };

  if (!isOpen) return null;

  const precioFinal = calcularPrecioFinal(producto.precio, cuotasSeleccionadas);
  const cuotaMensual = calcularCuotaMensual(precioFinal, cuotasSeleccionadas);
  const interes = calcularInteres(cuotasSeleccionadas) * 100;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: 30,
        borderRadius: 8,
        width: '90%',
        maxWidth: 500,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: 20, color: '#1976d2' }}>
          Seleccionar Plan de Cuotas
        </h2>
        <p style={{ marginBottom: 20, color: '#666' }}>
          Producto: {producto.nombre} - ${producto.precio.toLocaleString('es-AR')}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 'bold' }}>
              Selecciona el número de cuotas:
            </label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <input 
                  type="radio" 
                  name="cuotas" 
                  value={3} 
                  checked={cuotasSeleccionadas === 3} 
                  onChange={() => setCuotasSeleccionadas(3)}
                />
                3 cuotas (15% interés)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <input 
                  type="radio" 
                  name="cuotas" 
                  value={6} 
                  checked={cuotasSeleccionadas === 6} 
                  onChange={() => setCuotasSeleccionadas(6)}
                />
                6 cuotas (30% interés)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <input 
                  type="radio" 
                  name="cuotas" 
                  value={12} 
                  checked={cuotasSeleccionadas === 12} 
                  onChange={() => setCuotasSeleccionadas(12)}
                />
                12 cuotas (50% interés)
              </label>
            </div>
          </div>

          <div style={{ 
            background: '#f5f5f5', 
            padding: 15, 
            borderRadius: 8, 
            marginBottom: 20 
          }}>
            <h3 style={{ marginTop: 0, marginBottom: 10 }}>Resumen del Plan:</h3>
            <p><strong>Precio original:</strong> ${producto.precio.toLocaleString('es-AR')}</p>
            <p><strong>Interés ({interes}%):</strong> ${(producto.precio * calcularInteres(cuotasSeleccionadas)).toLocaleString('es-AR')}</p>
            <p><strong>Precio final:</strong> ${precioFinal.toLocaleString('es-AR')}</p>
            <p><strong>Cuota mensual:</strong> ${cuotaMensual.toLocaleString('es-AR')}</p>
            <p><strong>Total a pagar:</strong> ${precioFinal.toLocaleString('es-AR')}</p>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                background: '#666',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Confirmar Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ModalAgregarCliente = ({ isOpen, onClose, onSubmit, dni }) => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, dni });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: 30,
        borderRadius: 8,
        width: '90%',
        maxWidth: 400,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: 20, color: '#1976d2' }}>
          Agregar Nuevo Cliente
        </h2>
        <p style={{ marginBottom: 20, color: '#666' }}>
          DNI: {dni}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
              Nombre Completo:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre y Apellido"
              style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                background: '#666',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Agregar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ModalTarjeta = ({ isOpen, onClose, onSubmit, producto }) => {
  const [datosTarjeta, setDatosTarjeta] = useState({
    numero: '',
    titular: '',
    vencimiento: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(datosTarjeta);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: 30,
        borderRadius: 8,
        width: '90%',
        maxWidth: 500,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: 20, color: '#1976d2' }}>
          Datos de Tarjeta de Crédito
        </h2>
        <p style={{ marginBottom: 20, color: '#666' }}>
          Producto: {producto.nombre} - ${producto.precio.toLocaleString('es-AR')}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
              Número de Tarjeta:
            </label>
            <input
              type="text"
              value={datosTarjeta.numero}
              onChange={(e) => setDatosTarjeta({...datosTarjeta, numero: e.target.value.replace(/\D/g, '').slice(0, 16)})}
              placeholder="1234 5678 9012 3456"
              style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }}
              required
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
              Titular de la Tarjeta:
            </label>
            <input
              type="text"
              value={datosTarjeta.titular}
              onChange={(e) => setDatosTarjeta({...datosTarjeta, titular: e.target.value.toUpperCase()})}
              placeholder="NOMBRE APELLIDO"
              style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: 15, marginBottom: 15 }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
                Vencimiento:
              </label>
              <input
                type="text"
                value={datosTarjeta.vencimiento}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  }
                  setDatosTarjeta({...datosTarjeta, vencimiento: value.slice(0, 5)});
                }}
                placeholder="MM/AA"
                style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
                CVV:
              </label>
              <input
                type="text"
                value={datosTarjeta.cvv}
                onChange={(e) => setDatosTarjeta({...datosTarjeta, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                placeholder="123"
                style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 4 }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                background: '#666',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Confirmar Pago
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find(p => p.id === parseInt(id));
  const [dni, setDni] = useState('');
  const [verazChecked, setVerazChecked] = useState(false);
  const [verazAprobado, setVerazAprobado] = useState(null);
  const [compraIniciada, setCompraIniciada] = useState(false);
  const [puedeCredito, setPuedeCredito] = useState(null);
  const [metodoPago, setMetodoPago] = useState('');
  const [showModalTarjeta, setShowModalTarjeta] = useState(false);
  const [showModalCliente, setShowModalCliente] = useState(false);
  const [showModalCuotas, setShowModalCuotas] = useState(false);
  const [clienteEncontrado, setClienteEncontrado] = useState(null);
  const [buscandoCliente, setBuscandoCliente] = useState(false);

  if (!producto) return <div>Producto no encontrado</div>;

  const handleConfirmar = () => {
    setShowModalCuotas(true);
  };

  const handleConfirmarCuotas = (cuotas) => {
    const calcularInteres = (cuotas) => {
      switch(cuotas) {
        case 3: return 0.15;
        case 6: return 0.30;
        case 12: return 0.50;
        default: return 0.15;
      }
    };

    const precioFinal = producto.precio * (1 + calcularInteres(cuotas));
    const cuotaMensual = precioFinal / cuotas;
    const interes = calcularInteres(cuotas) * 100;

    Swal.fire({
      title: '¡Plan de Cuotas Confirmado!',
      html: `
        <div style="text-align: left;">
          <p><strong>Producto:</strong> ${producto.nombre}</p>
          <p><strong>Precio original:</strong> $${producto.precio.toLocaleString('es-AR')}</p>
          <p><strong>Plan seleccionado:</strong> ${cuotas} cuotas (${interes}% interés)</p>
          <p><strong>Interés:</strong> $${(producto.precio * calcularInteres(cuotas)).toLocaleString('es-AR')}</p>
          <p><strong>Precio final:</strong> $${precioFinal.toLocaleString('es-AR')}</p>
          <p><strong>Cuota mensual:</strong> $${cuotaMensual.toLocaleString('es-AR')}</p>
          <p><strong>Total a pagar:</strong> $${precioFinal.toLocaleString('es-AR')}</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Confirmar Compra'
    }).then(() => {
      setShowModalCuotas(false);
      navigate('/');
    });
  };

  const handlePagoEfectivo = () => {
    Swal.fire({
      title: '¡Éxito!',
      text: '¡Compra con efectivo realizada con éxito!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      navigate('/');
    });
  };

  const handlePagoTarjeta = (datosTarjeta) => {
    // Aquí se procesaría el pago con tarjeta
    console.log('Datos de tarjeta:', datosTarjeta);
    Swal.fire({
      title: '¡Éxito!',
      text: '¡Pago con tarjeta procesado con éxito!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      setShowModalTarjeta(false);
      navigate('/');
    });
  };

  const buscarCliente = async (dni) => {
    setBuscandoCliente(true);
    try {
      const response = await fetch(`http://localhost:3001/clientes/${dni}`);
      if (response.ok) {
        const cliente = await response.json();
        setClienteEncontrado(cliente);
        setVerazChecked(true);
        // Proceder con verificación de Veraz
        const verazResponse = await fetch(`http://localhost:3001/veraz/${dni}`);
        if (verazResponse.ok) {
          const verazData = await verazResponse.json();
          setVerazAprobado(verazData.estado === 'APROBADO');
          
          // Mostrar resultado de Veraz
          if (verazData.estado === 'APROBADO') {
            Swal.fire({
              title: '¡Veraz Aprobado!',
              text: `Cliente: ${cliente.nombre}\nDNI: ${cliente.dni}\nEstado: ${verazData.estado}`,
              icon: 'success',
              confirmButtonText: 'Continuar'
            });
            setCompraIniciada(true);
            setPuedeCredito(true);
          } else {
            Swal.fire({
              title: 'Veraz Rechazado',
              text: `Cliente: ${cliente.nombre}\nDNI: ${cliente.dni}\nEstado: ${verazData.estado}`,
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          }
        }
      } else {
        setClienteEncontrado(null);
        setShowModalCliente(true);
      }
    } catch (error) {
      console.error('Error buscando cliente:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al buscar cliente',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } finally {
      setBuscandoCliente(false);
    }
  };

  const agregarCliente = async (datosCliente) => {
    try {
      const response = await fetch('http://localhost:3001/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosCliente),
      });
      
      if (response.ok) {
        const nuevoCliente = await response.json();
        setClienteEncontrado(nuevoCliente);
        setShowModalCliente(false);
        Swal.fire({
          title: '¡Cliente Agregado!',
          text: 'El cliente ha sido agregado exitosamente a la base de datos',
          icon: 'success',
          confirmButtonText: 'Continuar'
        });
        // Proceder con verificación de Veraz
        const verazResponse = await fetch(`http://localhost:3001/veraz/${datosCliente.dni}`);
        if (verazResponse.ok) {
          const verazData = await verazResponse.json();
          setVerazAprobado(verazData.estado === 'APROBADO');
          
          // Mostrar resultado de Veraz
          if (verazData.estado === 'APROBADO') {
            Swal.fire({
              title: '¡Veraz Aprobado!',
              text: `Cliente: ${datosCliente.nombre}\nDNI: ${datosCliente.dni}\nEstado: ${verazData.estado}`,
              icon: 'success',
              confirmButtonText: 'Continuar'
            });
            setCompraIniciada(true);
            setPuedeCredito(true);
          } else {
            Swal.fire({
              title: 'Veraz Rechazado',
              text: `Cliente: ${datosCliente.nombre}\nDNI: ${datosCliente.dni}\nEstado: ${verazData.estado}`,
              icon: 'error',
              confirmButtonText: 'Entendido'
            });
          }
        }
      } else {
        const error = await response.json();
        Swal.fire({
          title: 'Error',
          text: error.error || 'Error al agregar cliente',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error agregando cliente:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al agregar cliente',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
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
      <main style={{ flex: 1, padding: '20px', maxWidth: '100%', overflowX: 'hidden' }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>&lt; Volver</button>
        <div style={{ 
          display: 'flex', 
          gap: 'clamp(15px, 3vw, 30px)',
          flexWrap: 'wrap'
        }}>
          <img src={producto.imagen} alt={producto.nombre} style={{ 
            width: 'clamp(250px, 40vw, 300px)', 
            height: 'clamp(250px, 40vw, 300px)', 
            objectFit: 'contain', 
            borderRadius: 8, 
            background: '#f9f9f9', 
            padding: 16,
            flexShrink: 0
          }} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <h1>{producto.nombre}</h1>
            <p>{producto.descripcion}</p>
            <p><b>Marca:</b> {producto.marca}</p>
            <p><b>Precio:</b> ${producto.precio.toLocaleString('es-AR')}</p>
            
            {!verazChecked ? (
              <div style={{ marginTop: 20 }}>
                <div style={{ marginBottom: 20 }}>
                  <label>
                    Ingresá tu DNI para validar en Veraz:<br />
                    <input
                      type="text"
                      value={dni}
                      onChange={e => setDni(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength={10}
                      style={{ fontSize: 18, padding: 6, marginTop: 8, width: 180 }}
                      placeholder="DNI"
                    />
                  </label>
                  <br />
                  <button
                    onClick={() => buscarCliente(dni)}
                    disabled={dni.length < 7 || buscandoCliente}
                    style={{ marginTop: 10, padding: '8px 16px', background: dni.length >= 7 && !buscandoCliente ? '#1976d2' : '#ccc', color: '#fff', border: 'none', borderRadius: 4 }}
                  >
                    {buscandoCliente ? 'Buscando...' : 'Buscar Cliente y Validar Veraz'}
                  </button>
                </div>
                
                <div style={{ borderTop: '1px solid #ddd', paddingTop: 20 }}>
                  <p style={{ marginBottom: 10, fontWeight: 'bold' }}>O paga con otro método:</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button
                      onClick={handlePagoEfectivo}
                      style={{ padding: '10px 20px', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16 }}
                    >
                      Comprar con Efectivo
                    </button>
                    <button
                      onClick={() => setShowModalTarjeta(true)}
                      style={{ padding: '10px 20px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16 }}
                    >
                      Comprar con Tarjeta
                    </button>
                  </div>
                </div>
              </div>
            ) : !verazAprobado ? (
              <div style={{ marginTop: 20 }}>
                <div style={{ color: 'red', marginBottom: 20 }}>
                  <b>Tu situación en Veraz no permite realizar la compra a crédito.</b>
                  <br />
                  <button onClick={() => { setVerazChecked(false); setDni(''); }} style={{ marginTop: 10 }}>Intentar con otro DNI</button>
                </div>
                
                <div style={{ borderTop: '1px solid #ddd', paddingTop: 20 }}>
                  <p style={{ marginBottom: 10, fontWeight: 'bold' }}>Paga con otro método:</p>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button
                      onClick={handlePagoEfectivo}
                      style={{ padding: '10px 20px', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16 }}
                    >
                      Comprar con Efectivo
                    </button>
                    <button
                      onClick={() => setShowModalTarjeta(true)}
                      style={{ padding: '10px 20px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16 }}
                    >
                      Comprar con Tarjeta
                    </button>
                  </div>
                </div>
              </div>
            ) : !compraIniciada ? null : puedeCredito === null ? null : puedeCredito ? (
              <div style={{ marginTop: 20 }}>
                <p>¡Felicidades! Puedes sacar un crédito para este producto.</p>
                <button onClick={handleConfirmar} style={{ padding: '10px 20px', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16 }}>
                  Comprar con crédito
                </button>
              </div>
            ) : (
              <div style={{ marginTop: 20 }}>
                <p>No puedes sacar un crédito. Elige otro método de pago:</p>
                <div style={{ marginBottom: 10 }}>
                  <label>
                    <input type="radio" name="metodoPago" value="efectivo" checked={metodoPago === 'efectivo'} onChange={() => setMetodoPago('efectivo')} /> Efectivo
                  </label>
                  <label style={{ marginLeft: 20 }}>
                    <input type="radio" name="metodoPago" value="tarjeta" checked={metodoPago === 'tarjeta'} onChange={() => setMetodoPago('tarjeta')} /> Tarjeta de Crédito
                  </label>
                </div>
                {metodoPago === 'efectivo' && (
                  <button 
                    onClick={handlePagoEfectivo} 
                    style={{ padding: '10px 20px', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16 }}
                  >
                    Comprar con Efectivo
                  </button>
                )}
                {metodoPago === 'tarjeta' && (
                  <button 
                    onClick={() => setShowModalTarjeta(true)} 
                    style={{ padding: '10px 20px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16 }}
                  >
                    Comprar con Tarjeta
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      
      <ModalTarjeta 
        isOpen={showModalTarjeta}
        onClose={() => setShowModalTarjeta(false)}
        onSubmit={handlePagoTarjeta}
        producto={producto}
      />
      
      <ModalAgregarCliente 
        isOpen={showModalCliente}
        onClose={() => setShowModalCliente(false)}
        onSubmit={agregarCliente}
        dni={dni}
      />
      
      <ModalCuotas 
        isOpen={showModalCuotas}
        onClose={() => setShowModalCuotas(false)}
        onSubmit={handleConfirmarCuotas}
        producto={producto}
      />
    </div>
  );
};

export default ProductoDetalle; 