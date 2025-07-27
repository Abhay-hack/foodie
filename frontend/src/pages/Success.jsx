import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h1>
      <p className="text-gray-700 mb-6">Thank you for ordering with QuickServe.</p>
      <Link
        to="/menu"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Back to Menu
      </Link>
    </div>
  );
};

export default Success;
