import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SmartImage from './SmartImage';
import { FaStar } from 'react-icons/fa';

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
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`bg-soft-white rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 font-nunito ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
      transition={{ duration: 0.7 }}
    >
      {dish.image && (
        <div className="relative">
          <SmartImage
            src={dish.image}
            alt={dish.name}
            className="w-full h-48 object-cover rounded-t-2xl animate-pulse-slow"
            fallback="/assets/placeholder-dish.png"
            altTextFallback={dish.name}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark-charcoal to-transparent opacity-20"></div>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-raleway font-semibold text-dark-charcoal truncate">{dish.name}</h3>
        {dish.category && (
          <span className="inline-block bg-fresh-green/20 text-fresh-green rounded-full px-3 py-1 text-xs font-semibold mt-2">
            {dish.category}
          </span>
        )}
        <p className="text-dark-charcoal text-sm mt-2 flex-grow">
          {dish.description || 'No description available.'}
        </p>

        {/* Ratings, reviews, and delivery time */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center text-yellow-500">
              <FaStar className="mr-1" /> {dish.rating || 0}
            </span>
            <span className="text-gray-500 text-sm">({dish.reviews || 0} reviews)</span>
          </div>
          {dish.deliveryTime && (
            <span className="text-gray-600 text-sm">{dish.deliveryTime}</span>
          )}
        </div>

        {/* Tags */}
        {dish.tags && dish.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {dish.tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <span className="text-tomato-red font-bold text-lg">₹{dish.price.toFixed(2)}</span>
          {showAddToCartButton && (
            <button
              onClick={onAddToCart}
              className="bg-orange-400 text-soft-white font-raleway font-semibold py-2 px-4 rounded-full text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-warm-orange animate-sparkle"
              aria-label={`Add ${dish.name} to cart`}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
