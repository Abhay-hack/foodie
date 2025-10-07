import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track auth status

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch profile
  useEffect(() => {
  const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          method: "GET",
          credentials: "include", // send cookies
        });

        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setUser(data); // show profile
      } catch (err) {
        setUser(null); // show login button
      } finally {
        setLoading(false); // ✅ important
      }
    };
    fetchProfile();
  }, []);


  const toggleMenu = () => setIsOpen(!isOpen);

  const getNavItemClass = (path) =>
    `px-4 py-2 text-base font-nunito font-medium text-gray-800 hover:text-orange-600 transition-colors duration-300 ${
      pathname === path ? "text-red-500 font-bold" : ""
    }`;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-colors duration-300 font-nunito ${
        isScrolled ? "bg-pink-50/90 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-raleway font-bold text-red-500"
        >
          QuickServe
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={getNavItemClass("/")}>Home</Link>
          <Link to="/explore" className={getNavItemClass("/explore")}>Explore</Link>
          <Link to="/restaurants" className={getNavItemClass("/restaurants")}>Restaurants</Link>
          <Link to="/offers" className={getNavItemClass("/offers")}>Offers</Link>
          <Link to="/about" className={getNavItemClass("/about")}>About</Link>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search (only show if not minimized) */}
          <form onSubmit={handleSearch} className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-orange-500 transition-colors bg-white text-gray-800"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-orange-500"
            >
              <FaSearch />
            </button>
          </form>

          {/* Auth Buttons */}
          {!loading && (
            <>
              {user ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="text-gray-800 hover:text-orange-500 focus:outline-none"
                  title="Profile"
                >
                  <FaUserCircle size={28} />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-red-500 text-white px-6 py-2 rounded-full font-raleway font-medium hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800 text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link onClick={toggleMenu} to="/" className={getNavItemClass("/")}>Home</Link>
            <Link onClick={toggleMenu} to="/explore" className={getNavItemClass("/explore")}>Explore</Link>
            <Link onClick={toggleMenu} to="/restaurants" className={getNavItemClass("/restaurants")}>Restaurants</Link>
            <Link onClick={toggleMenu} to="/offers" className={getNavItemClass("/offers")}>Offers</Link>
            <Link onClick={toggleMenu} to="/about" className={getNavItemClass("/about")}>About</Link>

            {/* Auth in Mobile */}
            {!loading && (
              <>
                {user ? (
                  <button
                    onClick={() => {
                      toggleMenu();
                      navigate("/profile");
                    }}
                    className="flex items-center space-x-2 text-gray-800 hover:text-orange-500"
                  >
                    <FaUserCircle size={22} />
                    <span>Profile</span>
                  </button>
                ) : (
                  <Link
                    onClick={toggleMenu}
                    to="/login"
                    className="bg-red-500 text-white px-6 py-2 rounded-full font-raleway font-medium hover:bg-orange-600 transition-colors duration-300"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
