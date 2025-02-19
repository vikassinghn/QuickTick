import { Link } from "react-router-dom";
import React from "react";
import { PiNotepadFill } from "react-icons/pi";
import { useAuth } from "../../AuthContext";  // Import AuthContext
import "./Navbar.css";

const NavbarPublic = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
    <div className="container-fluid">
      <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
        <PiNotepadFill size={24} className="text-dark" /> &nbsp; QuickTick
      </Link>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link className="nav-link text-dark fw-semibold px-4 mx-2" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-dark rounded px-4 mx-2" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-outline-dark rounded px-4 mx-2" to="/signin">Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const NavbarPrivate = ({ logout }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
    <div className="container-fluid">
      <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
        <PiNotepadFill size={24} className="text-dark" /> &nbsp; QuickTick
      </Link>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav align-items-center">
          <li className="nav-item">
            <Link className="nav-link text-dark fw-semibold px-4 mx-2" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark fw-semibold px-4 mx-2" to="/todo">Todo</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link text-danger fw-semibold border-0 bg-transparent" onClick={logout}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  return isAuthenticated ? <NavbarPrivate logout={logout} /> : <NavbarPublic />;
};

export default Navbar;
