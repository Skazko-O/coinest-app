import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss'
import './assets/fonts/fonts.css';
import { HashRouter, Routes, Route } from 'react-router';
import Layout from './layouts/MainLayout';
import NotFound from './pages/NotFound/NotFound';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import { ToastContainer } from 'react-toastify';
import Payment from './pages/Payment';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
     <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="payments/transfer" element={<Transfer />} />
          <Route path="payments/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
    </HashRouter>
  </React.StrictMode>
);