import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router';
import Layout from './layouts/MainLayout';
import NotFound from './pages/NotFound/NotFound';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import { ToastContainer } from 'react-toastify';
import Payment from './pages/Payment';
import './styles/index.scss'
import './assets/fonts/fonts.css';
import Transactions from './pages/Transactions';
import LoginPage from './pages/LoginPage';
import RequireAuth from './components/RequireAuth';
import Invoices from './pages/Invoices';
import Cards from './pages/Cards';
import Plans from './pages/Plans';
import Investments from './pages/Investments';
import Inbox from './pages/Inbox';
import Promos from './pages/Promos';
import Insights from './pages/Insights';
import PrivacyPolicy from './pages/Policy/PrivacyPolicy';
import TermsAndConditions from './pages/Policy/TermsAndConditions';
import Contact from './pages/Contact';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="payments/transfer" element={<Transfer />} />
            <Route path="payments/payment" element={<Payment />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="cards" element={<Cards />} />
            <Route path="plans" element={<Plans />} /> 
            <Route path="investments" element={<Investments />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="promos" element={<Promos />} />
            <Route path="insights" element={<Insights />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsAndConditions />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </HashRouter>
  </React.StrictMode>
);