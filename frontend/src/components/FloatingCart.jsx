// components/FloatingCart.jsx
import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingCart = () => {
  const { cartItems } = useCart();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Link to="/cart">
        <button
          className="relative bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110"
          title="Go to Cart"
        >
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </button>
      </Link>
    </div>
  );
};

export default FloatingCart;
