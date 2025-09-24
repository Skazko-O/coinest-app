import { useLocation } from "react-router";
import SearchInput from "./SearchInput";
import CircleBtn from "./CircleBtn";

function Header() {

  const pageTitles = {
    '/': 'Dashboard',
    '/payments': 'Payments',
    '/payments/transfer': 'Transfer',
    '/payments/payment': 'Payment',
    '/transactions': 'Transactions',
    '/invoices': 'Invoices',
    '/cards': 'Cards',
    '/savingplans': 'Saving Plans',
    '/investments': 'Investments',
    '/inbox': 'Inbox',
    '/promos': 'Promos',
    '/insights': 'Insights'
  }
 
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || 'Page';
  return (
    <header>
  <div className="pageName">
    <h1>{currentTitle}</h1>
    <div className="rightSection">
       {location.pathname === '/' && <SearchInput placeholder="Search..." />}
      <div className="circleGroup">
        <CircleBtn iconHref="/src/assets/images/icon/sprite_header.svg#ChatTeardropDots" />
        <CircleBtn iconHref="/src/assets/images/icon/sprite_header.svg#Bell" />
      </div>
      <div className="userGroup">
        <div>
          <a href="#" className="userName">
            Skazko Olrksandr
          </a>
        </div>
         <CircleBtn imgSrc="/src/assets/images/icon/Avatar.png" alt="avatar" />
      </div>
    </div>
  </div>
</header>
  );
}

export default Header;