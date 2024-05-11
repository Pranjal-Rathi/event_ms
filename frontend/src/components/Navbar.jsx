import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        EventVista
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/admin">Admin</NavLink>
        </li>
        <li>
          <NavLink to="/customer">Customer</NavLink>
        </li>
        <li>
          <NavLink to="/cust_booking">Bookings</NavLink>
        </li>
        <li>
          <NavLink to="/feedback">Feedback</NavLink>
        </li>
      </ul>
    </nav>
  );
};
