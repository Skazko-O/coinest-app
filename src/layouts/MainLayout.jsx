import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import style from './MainLayout.module.scss';
import '../styles/utilities.scss';

function Layout() {
  return (

    <>
      <Sidebar />
      <div className="content">
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
    </>
  );
}

export default Layout;
