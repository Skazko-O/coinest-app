import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import styles from './MainLayout.module.scss';

function Layout() {
  return (
    <div className={styles.pageWrapper}>
      <div className="content">
        <Sidebar />
        <div className="container">
          <Header />
          <Outlet />
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Layout;
