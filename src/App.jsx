import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/MainLayout';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>       
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

  );
}

export default App;