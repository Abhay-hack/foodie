import React, { useState } from 'react'; // Import useState for mobile menu
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for mobile toggle

const Navbar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  // Dynamically applies classes for active and hover states
  const getNavItemClass = (path) =>
    `relative px-4 py-2 mx-1 text-lg font-medium rounded-full transition-all duration-300 ease-in-out
    ${
      pathname === path
        ? 'text-white bg-orange-600 shadow-md transform scale-105' // Active state: more prominent food-related color
        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-100' // Inactive state: subtle hover
    }`;

  // Toggles mobile menu visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-orange-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link
          to="/"
          className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 animate-pulse-slow" // Added pulse animation
          onClick={() => setIsOpen(false)} // Close menu on logo click
        >
          QuickServe
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className={getNavItemClass('/')}>
            Home
          </Link>
          <Link to="/menu" className={getNavItemClass('/menu')}>
            Menu
          </Link>
          <Link to="/cart" className={getNavItemClass('/cart')}>
            Cart
          </Link>
          <Link to="/login" className={getNavItemClass('/login')} onClick={toggleMenu}>
            Login
          </Link>
          <Link to="/profile" className={getNavItemClass('/profile')} onClick={toggleMenu}>
            Profile
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger/Close Icon) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-orange-600 focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 shadow-inner">
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className={getNavItemClass('/')} onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/menu" className={getNavItemClass('/menu')} onClick={toggleMenu}>
              Menu
            </Link>
            <Link to="/cart" className={getNavItemClass('/cart')} onClick={toggleMenu}>
              Cart
            </Link>
            <Link to="/login" className={getNavItemClass('/login')} onClick={toggleMenu}>
              Login
            </Link>
            <Link to="/profile" className={getNavItemClass('/profile')} onClick={toggleMenu}>
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;