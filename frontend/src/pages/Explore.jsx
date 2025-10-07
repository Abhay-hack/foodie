import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import DishCard from '../components/DishCard';
import SmartImage from '../components/SmartImage';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import pizzaImg from '../assets/images/pizza.jpg';
import biryaniImg from '../assets/images/biryani.jpg';
import burgerImg from '../assets/images/burger.jpg';
import dessertImg from '../assets/images/dessert.jpg';
import navratriOffer from '../assets/images/navratri-offer.jpg';
import diwaliOffer from '../assets/images/diwali-offer.jpg';
import holiOffer from '../assets/images/holi-offer.jpg';
import r1 from '../assets/images/restaurant1.jpg';
import r2 from '../assets/images/restaurant2.jpg';
import r3 from '../assets/images/restaurant3.jpg';

const Explore = () => {
  const [dishes, setDishes] = useState([
  { id: 1, name: 'Margherita Pizza', image: pizzaImg, price: 299, category: 'Pizza', rating: 4.5, reviews: 120, deliveryTime: '30 mins', tags: ['Veg', 'Bestseller'] },
  { id: 2, name: 'Chicken Biryani', image: biryaniImg, price: 349, category: 'Biryani', rating: 4.7, reviews: 95, deliveryTime: '40 mins', tags: ['Non-Veg', 'Spicy'] },
  { id: 3, name: 'Cheese Burger', image: burgerImg, price: 199, category: 'Burgers', rating: 4.3, reviews: 110, deliveryTime: '25 mins', tags: ['Veg', 'Quick Bite'] },
  { id: 4, name: 'Chocolate Dessert', image: dessertImg, price: 149, category: 'Desserts', rating: 4.6, reviews: 60, deliveryTime: '20 mins', tags: ['Sweet', 'Bestseller'] },
  { id: 5, name: 'Veggie Pizza', image: pizzaImg, price: 329, category: 'Pizza', rating: 4.4, reviews: 88, deliveryTime: '35 mins', tags: ['Veg'] },
  { id: 6, name: 'Paneer Biryani', image: biryaniImg, price: 319, category: 'Biryani', rating: 4.5, reviews: 74, deliveryTime: '40 mins', tags: ['Veg', 'Spicy'] },
  { id: 7, name: 'Chicken Burger', image: burgerImg, price: 209, category: 'Burgers', rating: 4.2, reviews: 80, deliveryTime: '25 mins', tags: ['Non-Veg'] },
  { id: 8, name: 'Gulab Jamun', image: dessertImg, price: 99, category: 'Desserts', rating: 4.8, reviews: 150, deliveryTime: '15 mins', tags: ['Sweet'] },
  { id: 9, name: 'Pepperoni Pizza', image: pizzaImg, price: 399, category: 'Pizza', rating: 4.7, reviews: 140, deliveryTime: '30 mins', tags: ['Non-Veg', 'Spicy'] },
  { id: 10, name: 'Chocolate Lava Cake', image: dessertImg, price: 199, category: 'Desserts', rating: 4.9, reviews: 90, deliveryTime: '20 mins', tags: ['Sweet', 'Bestseller'] },
  ]);


  const [categories, setCategories] = useState([
    { name: 'Pizza', image: pizzaImg },
    { name: 'Biryani', image: biryaniImg },
    { name: 'Burgers', image: burgerImg },
    { name: 'Desserts', image: dessertImg },
  ]);

  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'Tasty Bites', image: r1, rating: 4.5 },
    { id: 2, name: 'Spice Haven', image: r2, rating: 4.2 },
    { id: 3, name: 'Burger Bonanza', image: r3, rating: 4.7 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search Dishes');
  const [selectedCategory, setSelectedCategory] = useState('');
  const searchRef = useRef(null);
  const dishesRef = useRef(null);
  const restaurantsRef = useRef(null);
  const offersRef = useRef(null);

  const controls = useAnimation();
  const dishesInView = useInView(dishesRef, { once: true, threshold: 0.2 });
  const restaurantsInView = useInView(restaurantsRef, { once: true, threshold: 0.2 });
  const offersInView = useInView(offersRef, { once: true, threshold: 0.2 });

  useEffect(() => {
    const placeholders = ['Search Dishes', 'Search Restaurants', 'Search Cuisines'];
    let idx = 0;
    const interval = setInterval(() => {
      setSearchPlaceholder(placeholders[idx]);
      idx = (idx + 1) % placeholders.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (dishesInView || restaurantsInView || offersInView) {
      controls.start('visible');
    }
  }, [controls, dishesInView, restaurantsInView, offersInView]);

  const handleSearch = () => {
    if (!searchQuery) return;
    const filteredDishes = dishes.filter(dish =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDishes(filteredDishes);
    setRestaurants(filteredRestaurants);
  };

  const [showAllDishes, setShowAllDishes] = useState(false);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category) {
      setDishes(dishes.filter(dish => dish.category === category));
    } else {
      setDishes([
        { id: 1, name: 'Margherita Pizza', image: pizzaImg, price: 299, category: 'Pizza' },
        { id: 2, name: 'Chicken Biryani', image: biryaniImg, price: 349, category: 'Biryani' },
        { id: 3, name: 'Cheese Burger', image: burgerImg, price: 199, category: 'Burgers' },
        { id: 4, name: 'Chocolate Dessert', image: dessertImg, price: 149, category: 'Desserts' },
      ]);
    }
  };

  const addToCart = (dish) => {
    alert(`Added ${dish.name} to cart!`);
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const festivalOffers = [
    { id: 1, name: 'Navratri Special', image: navratriOffer, discount: '20% OFF' },
    { id: 2, name: 'Diwali Delights', image: diwaliOffer, discount: '25% OFF' },
    { id: 3, name: 'Holi Treats', image: holiOffer, discount: '15% OFF' },
  ];

  return (
    <div className="bg-soft-white font-nunito min-h-screen">
      {/* Search Section */}
      <motion.section
        ref={searchRef}
        initial="hidden"
        animate={controls}
        variants={variants}
        className="py-16 bg-soft-white"
      >
        <div className="container mx-auto px-4">
          <div className="relative max-w-md mx-auto">
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={searchPlaceholder}
              className="w-full px-4 py-3 rounded-full border border-dark-charcoal focus:outline-none focus:border-warm-orange transition-colors text-center text-dark-charcoal text-base animate-pulse-slow"
              aria-label="Search for dishes or restaurants"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-tomato-red text-soft-white px-4 py-1 rounded-full font-raleway font-medium hover:bg-warm-orange transition-colors duration-300 animate-sparkle"
              aria-label="Search"
            >
              Search
            </button>
          </div>
        </div>
      </motion.section>

      {/* Festival Offers Section */}
      <motion.section
        ref={offersRef}
        initial="hidden"
        animate={offersInView ? 'visible' : 'hidden'}
        variants={variants}
        className="py-12 bg-soft-white"
      >
        <h2 className="text-3xl md:text-4xl font-raleway font-bold text-dark-charcoal text-center mb-8">Festival Offers</h2>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {festivalOffers.map((offer) => (
            <motion.div
              key={offer.id}
              className="bg-soft-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
              whileHover={{ boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <SmartImage
                src={offer.image}
                alt={offer.name}
                className="w-full h-48 object-cover"
                fallback="/assets/placeholder-restaurant.png"
                altTextFallback={offer.name}
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-raleway font-bold text-dark-charcoal">{offer.name}</h3>
                <p className="text-warm-orange font-semibold text-lg mt-2">{offer.discount}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="py-8 bg-soft-white">
        <h2 className="text-3xl md:text-4xl font-raleway font-bold text-dark-charcoal text-center mb-8">Explore by Category</h2>
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => handleCategoryFilter(category.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-raleway font-medium transition-colors duration-300 animate-sparkle ${
                selectedCategory === category.name
                  ? 'bg-tomato-red text-soft-white'
                  : 'bg-soft-white text-dark-charcoal border border-dark-charcoal hover:bg-warm-orange hover:text-soft-white'
              }`}
              variants={variants}
              initial="hidden"
              animate="visible"
            >
              <SmartImage
                src={category.image}
                alt={category.name}
                className="w-8 h-8 object-cover rounded-full"
                fallback="/assets/placeholder-32.png"
                altTextFallback={category.name}
              />
              {category.name}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Popular Dishes Section */}
      <motion.section
        ref={dishesRef}
       initial="hidden"
       animate={dishesInView ? 'visible' : 'hidden'}
       variants={variants}
       className="py-16 bg-soft-white"
      >
      <h2 className="text-3xl md:text-4xl font-raleway font-bold text-dark-charcoal text-center mb-12">
        Popular Dishes
      </h2>

          <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dishes
              .filter(dish => !selectedCategory || dish.category === selectedCategory)
              .slice(0, showAllDishes ? dishes.length : 4) // Show 5 or all dishes
              .map((dish) => (
                <DishCard key={dish.id} dish={dish} onAddToCart={() => addToCart(dish)} />
              ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllDishes(!showAllDishes)}
              className="bg-tomato-red text-soft-white font-raleway font-semibold py-2 px-6 rounded-full hover:bg-warm-orange transition-colors duration-300"
            >
              {showAllDishes ? 'Read Less' : 'Read More'}
            </button>
          </div>
      </motion.section>

      {/* Featured Restaurants Section */}
      <motion.section
        initial="hidden"
        animate={controls}
        variants={variants}
        className="py-16 bg-soft-white"
      >
        <h2 className="text-3xl md:text-4xl font-raleway font-bold text-dark-charcoal text-center mb-8">
          Featured Restaurants
        </h2>
        <div className="container mx-auto px-4 flex overflow-x-auto gap-4 py-4">
          {restaurants.slice(0, 3).map((restaurant) => (
            <motion.div
              key={restaurant.id}
              className="min-w-[250px] bg-soft-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition-transform duration-300 animate-pulse-slow"
              whileHover={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <SmartImage
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-48 object-cover rounded-md mb-4"
                fallback="/assets/placeholder-restaurant.png"
                altTextFallback={restaurant.name}
              />
              <h3 className="text-xl font-raleway font-bold text-dark-charcoal">{restaurant.name}</h3>
              <p className="text-fresh-green text-sm">Rating: {restaurant.rating} ★</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/restaurants"
            className="bg-orange-400 text-soft-white font-raleway font-semibold py-2 px-6 rounded-full hover:bg-warm-orange transition-colors duration-300"
          >
            Explore Restaurants
          </Link>
        </div>
      </motion.section>

    </div>
  );
};

export default Explore;
