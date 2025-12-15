import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? 'https://tfide-backend.onrender.com' : 'http://localhost:3001');

function Clientes() {
  const [dni, setDni] = useState('');
  const [nombre, setNombre] = useState('');
  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [veraz, setVeraz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch (e) { return null; }
  });
  const [creditos, setCreditos] = useState([]);

  // Buscar cliente por DNI
  const buscarCliente = async (e) => {
    e.preventDefault();
    setMensaje('');
    setCliente(null);
    setVeraz(null);
    setShowModal(false);
    try {
      const res = await fetch(`${API_URL}/clientes/${encodeURIComponent(dni)}`);
      if (res.ok) {
        const data = await res.json();
        setCliente(data);
        setNombre(data.nombre);
        setMensaje('Cliente encontrado.');
      } else if (res.status === 404) {
        setMensaje('Cliente no encontrado. Puedes agregarlo.');
        setCliente(null);
        setNombre('');
      } else {
        const err = await res.json().catch(() => ({}));
        setMensaje(err.error || 'Error al buscar cliente');
      }
    } catch (err) {
      setMensaje('Error al buscar cliente');
    }
  };

  // Cargar créditos (admin)
  const fetchCreditos = async () => {
    try {
      const res = await fetch(`${API_URL}/creditos`);
      if (res.ok) {
        const data = await res.json();
        setCreditos(data);
      }
    } catch (err) {}
  };

  React.useEffect(() => {
    if (user && user.role === 'admin') fetchCreditos();
  }, [user]);

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
    <div style={{ maxWidth: 1100, margin: '1.5rem auto', padding: '0 1rem' }}>
      {/* Barra superior de la página: título centrado (sin botón local) */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        {/* espacio a la izquierda para centrar el título */}
        <div style={{ width: 120 }} />

        <h2 style={{ margin: 0, textAlign: 'center', flex: 1 }}>Gestión de Clientes</h2>

        {/* espacio a la derecha para balancear la barra */}
        <div style={{ width: 120 }} />
      </header>

      {/* Contenido de gestión de clientes */}
      <section>
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

        {/* Si usuario no es admin, acceso denegado */}
        {(!user || user.role !== 'admin') ? (
          <div style={{ color: 'red' }}>
            Acceso denegado. Solo el administrador puede ver la gestión de clientes.
          </div>
        ) : (
          <div>
            <h3>Solicitudes de crédito</h3>
            {creditos.length === 0 ? (
              <div>No hay solicitudes.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Cliente</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>DNI</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Monto</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Plazo</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Estado</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {creditos.map(c => (
                    <tr key={c._id}>
                      <td style={{ padding: '8px 4px' }}>{c.clienteNombre}</td>
                      <td style={{ padding: '8px 4px' }}>{c.clienteDni}</td>
                      <td style={{ padding: '8px 4px' }}>{c.monto}</td>
                      <td style={{ padding: '8px 4px' }}>{c.plazoMeses}</td>
                      <td style={{ padding: '8px 4px' }}>{c.estado}</td>
                      <td style={{ padding: '8px 4px' }}>
                        {c.estado !== 'APROBADO' && (
                          <button onClick={async () => {
                            try {
                              const res = await fetch(`${API_URL}/creditos/${c._id}/approve`, { method: 'POST' });
                              const body = await res.json().catch(() => ({}));
                              if (res.ok) {
                                const veraz = body.veraz || {};
                                const estado = veraz.estado || (body.credito && body.credito.estado) || 'DESCONOCIDO';
                                if (estado === 'APROBADO') {
                                  Swal.fire({ icon: 'success', title: 'Crédito aprobado', text: `Estado VERAZ: ${estado}` });
                                } else if (estado === 'RECHAZADO') {
                                  Swal.fire({ icon: 'error', title: 'Crédito rechazado', text: `Estado VERAZ: ${estado}` });
                                } else {
                                  Swal.fire({ icon: 'info', title: 'Resultado', text: `Estado: ${estado}` });
                                }
                                fetchCreditos();
                              } else if (res.status === 409) {
                                // Existen otros adeudos: preguntar si desea forzar aprobación
                                const otros = body.otrosAdeudos || [];
                                const lista = otros.map(o => `${o.clienteNombre} (${o.clienteDni}) - Monto: ${o.monto} - Estado: ${o.estado}`).join('\n');
                                const result = await Swal.fire({
                                  title: 'Existen otros créditos adeudados',
                                  html: `<pre style="text-align:left">${lista}</pre>`,
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonText: 'Forzar aprobación',
                                  cancelButtonText: 'Cancelar'
                                });
                                if (result.isConfirmed) {
                                  // Forzar aprobación
                                  const res2 = await fetch(`${API_URL}/creditos/${c._id}/approve?force=true`, { method: 'POST' });
                                  const body2 = await res2.json().catch(() => ({}));
                                  if (res2.ok) {
                                    const estado2 = (body2.veraz && body2.veraz.estado) || (body2.credito && body2.credito.estado) || 'DESCONOCIDO';
                                    if (estado2 === 'APROBADO') Swal.fire({ icon: 'success', title: 'Crédito aprobado', text: `Estado VERAZ: ${estado2}` });
                                    else if (estado2 === 'RECHAZADO') Swal.fire({ icon: 'error', title: 'Crédito rechazado', text: `Estado VERAZ: ${estado2}` });
                                    else Swal.fire({ icon: 'info', title: 'Resultado', text: `Estado: ${estado2}` });
                                    fetchCreditos();
                                  } else {
                                    Swal.fire({ icon: 'error', title: 'Error', text: body2.error || 'Error al forzar aprobación' });
                                  }
                                }
                              } else {
                                Swal.fire({ icon: 'error', title: 'Error', text: body.error || 'Error al aprobar' });
                              }
                            } catch (err) { Swal.fire({ icon: 'error', title: 'Error', text: 'Error al aprobar' }); }
                          }} style={{ background: '#2e7d32', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Aprobar</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
      </section>
    </div>
  );
}

export default Clientes;