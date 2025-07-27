import React, { useEffect, useRef, useState } from 'react';

// Receive onAddToCart and showAddToCartButton as props
// Default showAddToCartButton to true so it shows unless explicitly set to false
const DishCard = ({ dish, onAddToCart, showAddToCartButton = true }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.disconnect(); // Ensure disconnect happens on unmount
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-700 ease-in-out transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow`}
    >
      {dish.image && (
        <div className="relative">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-48 object-cover rounded-t-xl"
            loading="lazy" // <--- ADD THIS
          />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-20"></div>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{dish.name}</h3>

        <p className="text-gray-600 text-sm mt-2 flex-grow">{dish.description || 'No description available.'}</p>

        {dish.category && (
          <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mt-2 mb-2">
            {dish.category}
          </span>
        )}

        <div className="mt-auto flex justify-between items-center">
          <span className="text-green-700 font-bold text-lg">₹{dish.price.toFixed(2)}</span>

          {/* Conditional Rendering: Only show button if showAddToCartButton is true */}
          {showAddToCartButton && (
            <button
              onClick={onAddToCart} // This prop will be provided by the parent (e.g., Menu page)
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;