import { Home, ShoppingCart } from "lucide-react";

import { useNavigate } from "react-router-dom";
const Navbar = ({ numb }) => {
    const navigate = useNavigate()


    return (
        <nav className="navbar">
            <div className="navbar-logo"
                onClick={() => navigate('/')}
            >E-Cart</div>

            <ul className="navbar-links">
                <li
                    onClick={() => navigate('/')}
                >
                    <Home size={18} />
                    <span>Home</span>
                </li>

                <li className="cart"
                    onClick={() => navigate('/cart')}
                >
                    <ShoppingCart size={20} />
                    <span className="cart-count">{numb}</span>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
