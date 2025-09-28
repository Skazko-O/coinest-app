import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/MainLayout';
import NotFound from './pages/NotFound/NotFound';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="payments/transfer" element={<Transfer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;