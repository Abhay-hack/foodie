import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const FloatingCart = () => {
  const { cartItems } = useCart();

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link to="/cart">
        <button
          className="relative bg-red-300 hover:bg-orange-500 text-soft-white p-3 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-warm-orange"
          title="Go to Cart"
          aria-label={`Go to Cart with ${cartItems.length} items`}
        >
          <ShoppingCart size={20} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-300 text-soft-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
      </Link>
    </motion.div>
  );
};

export default FloatingCart;