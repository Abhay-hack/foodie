import React from 'react';
import { motion } from 'framer-motion';

const OfferPopup = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="relative bg-yellow-100 border border-yellow-400 rounded-md shadow-lg p-6 text-center max-w-md mx-auto"
    >
      <h3 className="text-xl font-bold text-orange-800 mb-2">
        🔥 Limited Time Offer!
      </h3>
      <p className="text-sm text-orange-700 mb-4">
        Get <span className="font-bold">25% OFF</span> on orders over ₹299. Use code <span className="font-bold">FOODIE25</span> at checkout.
      </p>
      <button
        className="absolute top-2 right-3 text-red-600 font-bold text-lg hover:text-red-800"
        onClick={onClose}
      >
        &times;
      </button>
    </motion.div>
  );
};

export default OfferPopup;
