import { NavLink } from 'react-router-dom';

const menuItems = [
    { to: '/', icon: 'SquaresFour', label: 'Dashboard' },
    { to: '/payments', icon: 'CreditCard', label: 'Payments' },
    { to: '/transactions', icon: 'ArrowsLeftRight', label: 'Transactions' },
    { to: '/invoices', icon: 'Receipt', label: 'Invoices' },
    { to: '/cards', icon: 'Cardholder', label: 'Cards' },
    { to: '/plans', icon: 'Coins', label: 'Saving Plans' },
    { to: '/investments', icon: 'CurrencyEth', label: 'Investments' },
    { to: '/inbox', icon: 'Envelope', label: 'Inbox' },
    { to: '/promos', icon: 'SealPercent', label: 'Promos' },
    { to: '/insights', icon: 'Newspaper', label: 'Insights' },
];

function Sidebar() {
    return (
        <aside className="sidebar">
            <div>
                <div className="logo">
                    <a href="index.html">
                        <img src="src/assets/images/logo.png" alt="Coinest icon" />
                        <img src="src/assets/images/Coinest.png" alt="Coinest wordmark" />
                    </a>
                </div>
                <nav className="menu">
                    <ul>
                        {menuItems.map(({ to, icon, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    className={({ isActive }) =>
                                        isActive ? 'link active' : 'link'
                                    }                                >
                                    <svg>
                                        <use xlinkHref={`src/assets/images/icon-sidebar/sidebar-icon.svg#${icon}`} />
                                    </svg>
                                    <span className="menuText">{label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="getPro">
                <img src="src/assets/images/icon/LockOpen.svg" className="lock" />
                <img src="src/assets/images/icon/symbol.svg" className="symbol" />
                <div className="textGetPro">
                    Gain full access to your finances with detailed analytics and graphs
                </div>
                <button className="btnGetPro">Get Pro</button>
            </div>
        </aside>
    );
}

export default Sidebar;