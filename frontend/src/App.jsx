import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import FloatingCart from './components/FloatingCart';
import CustomCursor from './components/CustomCursor';
import OfferPopup from './components/OfferPopup';
import './index.css';


const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenOfferPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('hasSeenOfferPopup', 'true');
  };

  return (
    <CartProvider>
      <CustomCursor />
      <div className="min-h-screen flex flex-col font-nunito text-dark-charcoal bg-blue-50">
        <Navbar />
        <motion.main
          className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          role="main"
        >
          <AppRoutes />
        </motion.main>
        <Footer />
        <FloatingCart />
        {showPopup && <OfferPopup onClose={handleClosePopup} />}
      </div>
    </CartProvider>
  );
};

export default App;