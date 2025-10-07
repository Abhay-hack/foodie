
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-cream-50 font-poppins px-6">
      <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        aria-label="Go to Home"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;