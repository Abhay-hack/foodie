import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import SmartImage from '../components/SmartImage';

const Cart = () => {
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [showThankYouPanel, setShowThankYouPanel] = useState(false);
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  const handleCheckout = () => {
    setIsProcessingCheckout(true);
    setTimeout(() => {
      clearCart();
      setShowThankYouPanel(true);
      setIsProcessingCheckout(false);
    }, 1500);
  };

  if (cartItems.length === 0 && !showThankYouPanel) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center font-nunito bg-soft-white px-6">
        <SmartImage
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-24 h-24 mb-6 opacity-80 animate-pulse-slow"
          fallback="/assets/placeholder-cart.png"
          altTextFallback="Empty Cart"
        />
        <p className="text-xl text-dark-charcoal mb-8">Your cart is empty.</p>
        <button
          onClick={() => navigate('/explore')}
          className="bg-tomato-red hover:bg-warm-orange text-soft-white font-raleway font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-warm-orange animate-sparkle"
          aria-label="Explore Menu"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white font-nunito py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {showThankYouPanel ? (
          <motion.div
            className="max-w-xl mx-auto bg-soft-white p-8 rounded-2xl shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <CheckCircle className="w-20 h-20 text-fresh-green mx-auto mb-6" />
            <h2 className="text-3xl font-raleway font-bold text-dark-charcoal mb-4">
              Thank You for Your Order!
            </h2>
            <p className="text-dark-charcoal mb-8 leading-relaxed">
              Your order has been successfully placed and is now being processed.
              We'll send you an email confirmation shortly with your order details.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/explore')}
                className="bg-tomato-red hover:bg-warm-orange text-soft-white font-raleway font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-warm-orange animate-sparkle"
                aria-label="Continue Shopping"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-dark-charcoal/10 hover:bg-dark-charcoal/20 text-dark-charcoal font-raleway font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dark-charcoal animate-sparkle"
                aria-label="Go to Home"
              >
                Go to Home
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <h2 className="text-4xl font-raleway font-bold text-center text-dark-charcoal mb-12 animate-pulse-slow">
              🛒 Your Cart
            </h2>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  className="flex items-center justify-between bg-soft-white border border-dark-charcoal/20 rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <h3 className="text-xl font-raleway font-semibold text-dark-charcoal">{item.name}</h3>
                    <p className="text-dark-charcoal text-sm">
                      ₹{item.price} × {item.quantity}
                    </p>
                    <p className="text-tomato-red font-medium mt-1">
                      Total: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-tomato-red/10 hover:bg-tomato-red/20 text-tomato-red p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tomato-red animate-sparkle"
                    aria-label={`Remove ${item.name} from cart`}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
              <span className="text-2xl font-raleway font-semibold text-dark-charcoal mb-4 md:mb-0">
                Grand Total: <span className="text-tomato-red">₹{getTotalPrice().toFixed(2)}</span>
              </span>
              <button
                onClick={handleCheckout}
                className="bg-tomato-red hover:bg-warm-orange text-soft-white font-raleway font-semibold py-3 px-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-warm-orange animate-sparkle disabled:opacity-50"
                disabled={isProcessingCheckout || cartItems.length === 0}
                aria-label="Proceed to Checkout"
              >
                {isProcessingCheckout ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;