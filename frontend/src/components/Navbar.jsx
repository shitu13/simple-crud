import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">User Management</Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">User List</Link>
        <Link to="/add-user" className="navbar-link">Add New User</Link>
      </div>
    </nav>
  );
};

export default Navbar;
