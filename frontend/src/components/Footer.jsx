import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black py-12 font-nunito">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo + Tagline */}
        <div>
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-raleway font-bold text-red-600 mb-4 block hover:text-orange-600 transition-colors"
          >
            QuickServe
          </Link>
          <p className="text-gray-600 text-sm">
            Delicious food delivered fast. <br />
            Fresh, hot, and right at your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-raleway font-bold text-red-600 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-orange-600 transition-colors duration-300">Home</Link></li>
            <li><Link to="/explore" className="hover:text-orange-600 transition-colors duration-300">Explore</Link></li>
            <li><Link to="/restaurants" className="hover:text-orange-600 transition-colors duration-300">Restaurants</Link></li>
            <li><Link to="/offers" className="hover:text-orange-600 transition-colors duration-300">Offers</Link></li>
            <li><Link to="/about" className="hover:text-orange-600 transition-colors duration-300">About</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-raleway font-bold text-red-600 mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-orange-600 transition-colors duration-300">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-orange-600 transition-colors duration-300">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-orange-600 transition-colors duration-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-600 transition-colors duration-300">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-raleway font-bold text-red-600 mb-4">Follow Us</h3>
          <div className="flex space-x-5">
            <a href="https://facebook.com" 
               className="text-gray-600 hover:text-blue-600 transition-colors duration-300" 
               aria-label="Facebook">
              <FaFacebook size={26} />
            </a>
            <a href="https://instagram.com" 
               className="text-gray-600 hover:text-pink-600 transition-colors duration-300" 
               aria-label="Instagram">
              <FaInstagram size={26} />
            </a>
            <a href="https://twitter.com" 
               className="text-gray-600 hover:text-sky-600 transition-colors duration-300" 
               aria-label="Twitter">
              <FaTwitter size={26} />
            </a>
            <a href="https://linkedin.com" 
               className="text-gray-600 hover:text-blue-800 transition-colors duration-300" 
               aria-label="LinkedIn">
              <FaLinkedin size={26} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center mt-10 text-gray-500 text-sm border-t border-gray-300 pt-4">
        &copy; 2025 <span className="text-red-600 font-semibold hover:text-orange-600 transition-colors">QuickServe</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
