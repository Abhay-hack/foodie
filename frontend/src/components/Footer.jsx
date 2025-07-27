import React from 'react';
// Don't forget to install react-icons if you haven't already:
// npm install react-icons
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-800 text-orange-50 py-10 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Section 1: Brand Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4 text-white">Quick Serve</h3>
          <p className="text-lg mb-4">
            Your daily dose of delicious recipes, culinary inspiration, and food adventures.
          </p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Quick Serve. All rights reserved.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-lg">
            <li><a href="/about" className="hover:text-orange-300 transition duration-300">About Us</a></li>
            <li><a href="/contact" className="hover:text-orange-300 transition duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Section 3: Follow Us */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-xl font-semibold mb-4 text-white">Follow Us</h4>
          <div className="flex space-x-6 text-3xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition duration-300">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition duration-300">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition duration-300">
              <FaTwitter />
            </a>
            <a href="mailto:info@quickserve.com" className="hover:text-orange-300 transition duration-300">
              <FaEnvelope />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;