import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext';
import FloatingCart from './components/FloatingCart';
import CustomCursor from './components/CustomCursor';

const App = () => {
  return (
    
    <CartProvider> {/* ✅ Wrap your entire app here */}
      <CustomCursor />
      {/* Updated background and default text colors */}
      <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 text-gray-800">
        <Navbar />
        {/* The main content area can have a slightly richer background if desired, or let the body gradient show through */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <AppRoutes />
        </main>
        <Footer />
        <FloatingCart />
      </div>
    </CartProvider>
  );
};

export default App;