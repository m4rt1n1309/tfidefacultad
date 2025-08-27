import React, { useState } from 'react';

const API_URL = 'http://localhost:3001';

function Clientes() {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [veraz, setVeraz] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Buscar cliente por DNI
  const buscarCliente = async (e) => {
    e.preventDefault();
    setMensaje('');
    setCliente(null);
    setVeraz(null);
    setShowModal(false);
    try {
      const res = await fetch(`${API_URL}/clientes`);
      const data = await res.json();
      const encontrado = data.find(c => c.dni === dni);
      if (encontrado) {
        setCliente(encontrado);
        setNombre(encontrado.nombre);
        setMensaje('Cliente encontrado.');
      } else {
        setMensaje('Cliente no encontrado. Puedes agregarlo.');
        setCliente(null);
        setNombre('');
      }
    } catch (err) {
      setMensaje('Error al buscar cliente');
    }
  };

  // Agregar cliente
  const agregarCliente = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const res = await fetch(`${API_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, dni })
      });
      const data = await res.json();
      if (res.ok) {
        setCliente(data);
        setMensaje('Cliente agregado correctamente.');
      } else {
        setMensaje(data.error);
      }
    } catch (err) {
      setMensaje('Error al agregar cliente');
    }
  };

  // Consultar VERAZ
  const consultarVeraz = async () => {
    setVeraz(null);
    setShowModal(true);
    try {
      const res = await fetch(`${API_URL}/veraz/${dni}`);
      const data = await res.json();
      if (res.ok) {
        setVeraz(data);
      } else {
        setVeraz({ estado: data.error });
      }
    } catch (err) {
      setVeraz({ estado: 'Error al consultar VERAZ' });
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2>Gestión de Clientes</h2>
      <form onSubmit={buscarCliente} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="DNI"
          value={dni}
          onChange={e => setDni(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <button type="submit">Buscar</button>
      </form>

      {mensaje && <div style={{ color: 'blue', marginBottom: 10 }}>{mensaje}</div>}

      {/* Si no existe el cliente, mostrar formulario de alta */}
      {!cliente && mensaje.includes('no encontrado') && (
        <form onSubmit={agregarCliente} style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
            style={{ marginRight: 10 }}
          />
          <button type="submit">Agregar Cliente</button>
        </form>
      )}

      {/* Si existe el cliente, mostrar datos y botón VERAZ */}
      {cliente && (
        <div style={{ marginBottom: 20 }}>
          <div><strong>Nombre:</strong> {cliente.nombre}</div>
          <div><strong>DNI:</strong> {cliente.dni}</div>
          <button onClick={consultarVeraz} style={{ marginTop: 10 }}>Consultar VERAZ</button>
        </div>
      )}

      {/* Modal para resultado VERAZ */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: 'white', padding: 30, borderRadius: 8, minWidth: 250, textAlign: 'center' }}>
            <h3>Resultado VERAZ</h3>
            <div style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
              {veraz ? veraz.estado : 'Consultando...'}
            </div>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clientes; 