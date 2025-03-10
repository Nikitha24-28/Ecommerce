import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
        const pages = {
        user: [
            { text: "Explore", link: "/Explore" },
            { text: "Products", link: "/Products" },
            { text: "Cart", link: "/Cart" },
            { text: "My Orders", link: "/Orders" }
        ],
        admin: [
            { text: "Dashboard", link: "/AdminDashboard" },
            { text: "Add Products", link: "/AddProducts" },
            { text: "Order Summary", link: "/OrderSummary" }
        ]
    };
    
    const rolelc = localStorage.getItem("role") || "";
    const link = pages[rolelc] || [];

    const handleLogout = () => {
        localStorage.removeItem("role");
        window.location.href = "/Explore"; // Redirect to Explore after logout
    };

    return (
        <nav>
            {link.map((page, index) => (
                <Link className="navitem" key={index} to={page.link}>{page.text}</Link>
            ))}
            <button onClick={handleLogout} className='logout'>Logout</button>
        </nav>
    );
};

export default Navbar;