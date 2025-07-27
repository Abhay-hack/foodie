// frontend/src/pages/Cart.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { CheckCircle } from 'lucide-react'; // Import a checkmark icon for the success message

const Cart = () => {
  // Assuming useCart provides a clearCart function
  const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // NEW STATE: To control the visibility of the thank you message panel
  const [showThankYouPanel, setShowThankYouPanel] = useState(false);
  // Optional: State to manage checkout processing status
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // Use a ref and state for the animation on the thank you panel itself, if desired,
  // but a simple conditional render with Tailwind's animation utility is usually enough.
  // We'll rely on the animate-fade-in-up from tailwind.config.js for the animation.

  const handleCheckout = () => {
    setIsProcessingCheckout(true); // Indicate that checkout is in progress

    // Simulate an async checkout process (e.g., sending order to backend)
    setTimeout(() => {
      // In a real app:
      // 1. Send order details to your backend API
      // 2. Handle payment processing
      // 3. Clear cart AFTER successful backend confirmation

      // For now, simulate success:
      console.log('Checkout processed!');
      clearCart(); // Clear the cart once "checkout" is complete
      setShowThankYouPanel(true); // Show the thank you panel
      setIsProcessingCheckout(false); // Reset processing status

      // Optionally, navigate to home/order history after a delay
      // setTimeout(() => {
      //   navigate('/');
      // }, 5000); // Navigate after 5 seconds
    }, 1500); // Simulate network delay of 1.5 seconds
  };

  // If cart is empty and we are not showing the thank you panel, display empty cart message
  if (cartItems.length === 0 && !showThankYouPanel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center text-xl text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-24 h-24 mb-4 opacity-80"
        />
        Your cart is empty.
      </div>
    );
  }

  // Conditionally render the Thank You Panel or the Cart details
  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      {showThankYouPanel ? (
        // --- THANK YOU PANEL ---
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in-up transition-opacity duration-700 ease-out">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" /> {/* Checkmark icon */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your order has been successfully placed and is now being processed.
            We'll send you an email confirmation shortly with your order details.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/menu')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/')} // Or navigate to an order history page if you build one
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      ) : (
        // --- CART DETAILS ---
        <>
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">
            🛒 Your Cart
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white border rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">
                    ₹{item.price} × {item.quantity}
                  </p>
                  <p className="text-green-600 font-medium mt-1">
                    Total: ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-full transition-all"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center">
            <span className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
              Grand Total: <span className="text-green-700">₹{getTotalPrice().toFixed(2)}</span>
            </span>
            <button
              onClick={handleCheckout}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
              disabled={isProcessingCheckout || cartItems.length === 0} // Disable while processing or if cart is empty
            >
              {isProcessingCheckout ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;