import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Ecommerce from './pages/Ecommerce';
import ProductoDetalle from './pages/ProductoDetalle';
import Login from './pages/Login';
import Register from './pages/Register';
import Credito from './pages/Credito';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Ecommerce />} />
            <Route path="/producto/:id" element={<ProductoDetalle />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/credito" element={<Credito />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
