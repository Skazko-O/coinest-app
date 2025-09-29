import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const menuItems = [
    { to: '/', icon: 'SquaresFour', label: 'Dashboard' },
    {
        icon: 'CreditCard', label: 'Payments', children: [
            { to: '/payments/transfer', label: 'Transfer' },
            { to: '/payments/payment', label: 'Payment' },
        ],
    },
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
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (label) => {
        setOpenDropdown(openDropdown === label ? null : label);
    };

    return (
        <aside className="sidebar collapsed">
            <div>
                <div className="logo">
                    <Link to="/">
                        <img src="assets/images/logo.png" alt="Coinest icon" className='logoIcon' />
                        <img src="assets/images/Coinest.png" alt="Coinest wordmark" className="logoWordmark" />
                    </Link>
                </div>
                <nav className="menu">
                    <ul>
                        {menuItems.map(({ to, icon, label, children }) => (
                            <li key={label}>
                                {children ? (
                                    <>
                                        <span
                                            className="link dropdown-toggle"
                                            onClick={() => toggleDropdown(label)}
                                        >
                                            <svg>
                                                <use xlinkHref={`assets/images/icon/sidebar-icon.svg#${icon}`} />
                                            </svg>
                                            <span className="menuText">{label}</span>
                                            <span className="arrow">{openDropdown === label ?
                                                <svg>
                                                    <use xlinkHref="assets/images/icon/sidebar-icon.svg#AngleUp" />
                                                </svg>
                                                :
                                                <svg>
                                                    <use xlinkHref="assets/images/icon/sidebar-icon.svg#AngleDown" />
                                                </svg>
                                            }</span>
                                        </span>
                                        {openDropdown === label && (
                                            <ul className="submenu">
                                                {children.map(({ to, label }) => (
                                                    <li key={to}>
                                                        <NavLink
                                                            to={to}
                                                            className={({ isActive }) =>
                                                                isActive ? 'link active submenu-link' : 'link submenu-link-thin'
                                                            }
                                                        >
                                                            <span className="menuText">{label}</span>
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </>
                                ) : (
                                    <NavLink
                                        to={to}
                                        className={({ isActive }) =>
                                            isActive ? 'link active' : 'link'
                                        }
                                    >
                                        <svg>
                                            <use xlinkHref={`assets/images/icon/sidebar-icon.svg#${icon}`} />
                                        </svg>
                                        <span className="menuText">{label}</span>
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="getPro">
                <img src="assets/images/icon/LockOpen.svg" className="lock" />
                <img src="assets/images/icon/symbol.svg" className="symbol" />
                <div className="textGetPro">
                    Gain full access to your finances with detailed analytics and graphs
                </div>
                <button className="btnGetPro">Get Pro</button>
            </div>
        </aside>
    );
}

export default Sidebar;