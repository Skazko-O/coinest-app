import { Outlet } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';
import style from './MainLayout.module.scss';
import '../styles/utilities.scss';

function Layout() {
  return (

    <>
      <Sidebar />
      <div className="content">
        <div className={style.myContainer}>
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
