import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DishCard from '../components/DishCard';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import OfferPopup from '../components/OfferPopup';

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dishes');
        // Limit to the first 6 dishes for the Home page
        setDishes(res.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, []);

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="relative font-sans bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 min-h-screen overflow-x-hidden">

      {/* 🍕 Offer Popup */}
      {showPopup && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <OfferPopup onClose={handleClosePopup} />
        </div>
      )}

      {/* 🏞️ Hero Section */}
      <div
        className="bg-cover bg-center h-[70vh] flex items-center justify-center text-white px-4"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 md:p-10 rounded-xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-4">
            <Typewriter
              words={['Delicious Delivered To You', 'Cravings Satisfied', 'Hot, Fresh & Fast!']}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>
          <p className="text-base md:text-xl text-gray-100">
            Satisfy your cravings with our mouthwatering dishes!
          </p>
        </div>
      </div>

      {/* 🍜 Popular Dishes */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">
          Popular Dishes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* IMPORTANT: Don't show Add to Cart button on Home page */}
              <DishCard dish={dish} showAddToCartButton={false} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 📣 Call to Action */}
      <div className="bg-red-100 py-10">
        <div className="container mx-auto text-center px-4">
          <h3 className="text-2xl font-semibold text-red-600 mb-4">
            Hungry? Don’t Wait!
          </h3>
          <p className="mb-6 text-gray-800">
            Order your favorite dishes now and enjoy fast delivery!
          </p>
          <a
            href="/menu"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
          >
            Explore Menu
          </a>
        </div>
      </div>

      {/* ⭐ Why Choose Us */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: 'Fresh Ingredients',
              color: 'bg-orange-200',
              icon: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
              text: 'Only the best locally sourced produce and spices go into our dishes.',
            },
            {
              title: 'Lightning Fast Delivery',
              color: 'bg-yellow-200',
              icon: 'https://cdn-icons-png.flaticon.com/512/3205/3205463.png',
              text: 'Hot and fresh meals delivered to your doorstep in under 30 minutes.',
            },
            {
              title: 'Affordable Pricing',
              color: 'bg-green-100',
              icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png',
              text: 'Great taste doesn’t have to break the bank. Eat well for less!',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className={`${card.color} rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300`}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 40 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <img src={card.icon} alt={card.title} className="w-20 h-20 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-rose-600">{card.title}</h4>
              <p className="text-gray-800">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;