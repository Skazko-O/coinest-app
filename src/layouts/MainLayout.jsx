import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import  style from './MainLayout.module.scss';
import  '../styles/utilities.scss';

function Layout() {
  return (

    <div className="content">
      <Sidebar />
      <div className="container">
        <div className={style.pageWrapper}>
          <Header />
          <main className={style.main}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
