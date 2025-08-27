import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Ecommerce from './pages/Ecommerce';
import ProductoDetalle from './pages/ProductoDetalle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ecommerce />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </Router>
  );
}

export default App;
