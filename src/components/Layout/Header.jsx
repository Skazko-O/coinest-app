import { useLocation } from "react-router";
import SearchInput from "../SearchInput";
import CircleBtn from "../CircleBtn";
import Themeswitcher from '../Themeswitcher';
import CurrencyRates from "../CurrencyRates";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'

function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  }

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
    
  }

  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || 'Page';
  return (
    <header>
      <div className="myContainer">
        <div className="pageName">
          <h1>{currentTitle}</h1>
          <div> <CurrencyRates /></div>
          <div className="rightSection">
            {location.pathname === '/' && <SearchInput placeholder="Search..." />}
            <div className="circleGroup">
              <CircleBtn iconHref="assets/images/icon/sprite_header.svg#ChatTeardropDots" />
              <CircleBtn iconHref="assets/images/icon/sprite_header.svg#Bell" />
              <Themeswitcher />
            </div>
            <div className="userGroup">
              <div>
                <Link to="/" className="userName">
                  Skazko Oleksandr
                </Link>
              </div>
              <CircleBtn imgSrc="assets/images/avatars/Avatar.png" alt="avatar" />
              <button onClick={handleLogout} className="logoutBtn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;