import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Link } from 'react-router-dom';
import SearchInput_Header from "../SearchInput_Header";
import CircleBtn from "../CircleBtn";
import Themeswitcher from '../Themeswitcher';
import CurrencyRates from "../CurrencyRates";
import { useCommonStore } from '../../store/commonStore';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const colorTheme = useCommonStore((state) => state.colorTheme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const pageTitles = {
    '/': 'Dashboard',
    '/payments': 'Payments',
    '/payments/transfer': 'Transfer',
    '/payments/payment': 'Payment',
    '/transactions': 'Transactions',
    '/invoices': 'Invoices',
    '/cards': 'Cards',
    '/plans': 'Saving Plans',
    '/investments': 'Investments',
    '/inbox': 'Inbox',
    '/promos': 'Promos',
    '/insights': 'Insights',
    '/privacy-policy': 'Privacy policy',
    '/terms': 'Terms and conditions',
    '/contact': 'Contact',
  };

  const currentTitle = pageTitles[location.pathname] || 'Page';
  const logoSrc = `assets/images/logo-${colorTheme}.png`;

  return (
    <header>
      <div className="myContainer headerContainer">
        <div className="pageName">
          <div className="logoHeader">
            <Link to="/">
              <img src={logoSrc} alt="Coinest icon" className="logoIcon" />
            </Link>
          </div>

          <h1>{currentTitle}</h1>
          <CurrencyRates />

          <div className="rightSection">
            {location.pathname === '/' && <SearchInput_Header placeholder="Search..." />}
            <div className="circleGroup">
              <CircleBtn iconHref="assets/images/icon/sprite_header.svg#ChatTeardropDots" />
              <CircleBtn iconHref="assets/images/icon/sprite_header.svg#Bell" />
              <Themeswitcher />
            </div>
            <div className="userGroup">
              <Link to="/" className="userName">Skazko Oleksandr</Link>
              <CircleBtn imgSrc="assets/images/avatars/Avatar.png" alt="avatar" />
              <button onClick={handleLogout} className="logoutBtn">Logout</button>
            </div>
          </div>

          {/* Гамбургер */}
          <div className="hamburger">
            <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span></span>
            </button>
          </div>

          {/* Мобільне меню */}
          <div className={`mobile-menu-panel ${isMenuOpen ? 'open' : ''}`}>            
            <div className="userGroup">
              <Link to="/" className="userName">Skazko Oleksandr</Link>
              <CircleBtn imgSrc="assets/images/avatars/Avatar.png" alt="avatar" />
              <button onClick={handleLogout} className="logoutBtn">Logout</button>
            </div>
            <nav>
              <ul>
                <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Dashboard</Link></li>
                <li><Link to="/payments/transfer" onClick={() => setIsMenuOpen(false)}>Transfer</Link></li>
                <li><Link to="/payments/payment" onClick={() => setIsMenuOpen(false)}>Payment</Link></li>
                <li><Link to="/transactions" onClick={() => setIsMenuOpen(false)}>Transactions</Link></li>
                <li><Link to="/invoices" onClick={() => setIsMenuOpen(false)}>Invoices</Link></li>
                <li><Link to="/cards" onClick={() => setIsMenuOpen(false)}>Cards</Link></li>
                <li><Link to="/plans" onClick={() => setIsMenuOpen(false)}>Saving Plans</Link></li>
                <li><Link to="/investments" onClick={() => setIsMenuOpen(false)}>Investments</Link></li>
                <li><Link to="/inbox" onClick={() => setIsMenuOpen(false)}>Inbox</Link></li>
                <li><Link to="/promos" onClick={() => setIsMenuOpen(false)}>Promos</Link></li>
                <li><Link to="/insights" onClick={() => setIsMenuOpen(false)}>Insights</Link></li>
              </ul>
            </nav>
            <Themeswitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
