// Home.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Carousel } from 'react-responsive-carousel';
import { FaAppStoreIos, FaGooglePlay } from 'react-icons/fa';
import SmartImage from '../components/SmartImage';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import pizzaImg from '../assets/images/pizza.jpg';
import biryaniImg from '../assets/images/biryani.jpg';
import burgerImg from '../assets/images/burger.jpg';
import dessertImg from '../assets/images/dessert.jpg';
import offer1Img from '../assets/images/fooddiscount.png';
import offer2Img from '../assets/images/fooddeliveryscooter.jpg';
import supremePizzaImg from '../assets/images/supremepizza.jpg';
import mobileMockup from '../assets/images/mobileappmockup.jpg';
import hero from '../assets/video/hero.mp4';
import avatarImg1 from '../assets/images/avatar.png'; 
import avatarImg2 from '../assets/images/avatar1.png'; 

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [searchPlaceholder, setSearchPlaceholder] = useState('');
  const searchRef = useRef(null);
  const whyChooseRef = useRef(null);
  const showcaseRef = useRef(null);
  const offersRef = useRef(null);
  const appPromoRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const controls = useAnimation();
  const whyChooseInView = useInView(whyChooseRef, { once: true, threshold: 0.2 });
  const showcaseInView = useInView(showcaseRef, { once: true, threshold: 0.2 });
  const offersInView = useInView(offersRef, { once: true, threshold: 0.2 });
  const appPromoInView = useInView(appPromoRef, { once: true, threshold: 0.2 });
  const testimonialsInView = useInView(testimonialsRef, { once: true, threshold: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, threshold: 0.2 });

  useEffect(() => {
    setCategories([
      { name: 'Pizza', image: pizzaImg },
      { name: 'Biryani', image: biryaniImg },
      { name: 'Burgers', image: burgerImg },
      { name: 'Desserts', image: dessertImg },
    ]);
    setOffers([
      { title: '25% Off', description: 'On orders over ₹299', image: offer1Img },
      { title: 'Free Delivery', description: 'On first order', image: offer2Img },
    ]);
    setTestimonials([
      { text: 'The food is always fresh and delivered so quickly!', name: 'John Doe', avatar: avatarImg1 },
      { text: 'Amazing offers and a seamless ordering experience!', name: 'Jane Smith', avatar: avatarImg2 },
    ]);

    const placeholders = ['Search Pizza', 'Search Pasta', 'Search Desserts'];
    let index = 0;
    const interval = setInterval(() => {
      setSearchPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (whyChooseInView || showcaseInView || offersInView || appPromoInView || testimonialsInView || ctaInView) {
      controls.start('visible');
    }
  }, [controls, whyChooseInView, showcaseInView, offersInView, appPromoInView, testimonialsInView, ctaInView]);

  const variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    hover: { scale: 1.05, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)', transition: { duration: 0.3 } },
  };

  return (
    <div className="font-nunito min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={hero} type="video/mp4" />
        </video>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <TypeAnimation
            sequence={['Delicious Food Delivered Fast', 2000, 'Savor Every Bite', 2000]}
            wrapper="h1"
            cursor={true}
            className="text-4xl md:text-6xl font-raleway font-bold text-red-600 drop-shadow-lg mb-6"
          />
          <motion.p className="text-lg md:text-2xl text-gray-800 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            Fresh, Hot, and Right at Your Doorstep
          </motion.p>
          <motion.button className="bg-red-500 text-white px-8 py-3 rounded-full font-raleway font-semibold hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300" variants={variants} initial="visible" whileHover="hover">
            Order Now
          </motion.button>
        </div>
      </section>

      {/* What We Serve */}
      <motion.section ref={whyChooseRef} initial="hidden" animate={whyChooseInView ? 'visible' : 'hidden'} variants={variants} className="py-20">
        <h2 className="text-4xl md:text-5xl font-raleway font-extrabold text-stone-800 text-center mb-12 tracking-tight">What We Serve</h2>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div key={index} className="relative rounded-lg overflow-hidden shadow-xl cursor-pointer" variants={variants} custom={index} initial="hidden" animate="visible" whileHover="hover">
              <SmartImage src={category.image} alt={category.name} className="w-full h-64 object-cover" fallback="/assets/placeholder-300x200.png" altTextFallback={category.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                <h3 className="text-2xl font-raleway font-bold text-white tracking-wider">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose QuickServe */}
      <motion.section 
          ref={whyChooseRef} 
          initial="hidden" 
          animate={whyChooseInView ? 'visible' : 'hidden'} 
          variants={variants} 
          className="py-20" // Added a very light background for contrast
      >
          {/* UPDATED HEADING STYLE */}
          <h2 className="text-4xl md:text-5xl font-raleway font-extrabold text-stone-800 text-center mb-16 tracking-tight">
              Why Choose QuickServe?
          </h2>

          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                  { id: 'delivery', icon: '🚀', title: 'Fast Delivery', desc: 'Delivered in under 30 minutes' },
                  { id: 'freshness', icon: '🥗', title: 'Fresh Food', desc: 'Made with premium ingredients' },
                  { id: 'offers', icon: '💰', title: 'Best Offers', desc: 'Exclusive discounts daily' },
              ].map((item, index) => {

                  // DYNAMIC COLOR DEFINITIONS
                  let bgClass = '';
                  let textClass = '';
                  let iconClass = '';
              
                  if (item.id === 'delivery') {
                      bgClass = 'bg-red-500';  // Primary Brand Red
                      iconClass = 'text-white'; // White icon for contrast
                  } else if (item.id === 'freshness') {
                      bgClass = 'bg-teal-100';  // Freshness Teal Background
                      textClass = 'text-teal-600'; // Teal Icon Color
                  } else if (item.id === 'offers') {
                      bgClass = 'bg-orange-400'; // Value Orange Background
                      textClass = 'text-gray-900'; // Dark text for legibility
                  }
                
                  return (
                      <motion.div 
                          key={index} 
                          // UPDATED CARD STYLE: bg-white, rounded-xl, and sharper shadow
                          className="text-center p-8 bg-blue-100 shadow-xl rounded-xl" 
                          variants={variants} 
                          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }} // Stronger hover effect
                      >
                          {/* DYNAMIC ICON WRAPPER */}
                          <div className="flex justify-center mb-6">
                              <div className={`p-4 rounded-full ${bgClass} ${textClass}`}>
                                  <span className={`text-4xl ${iconClass}`}>{item.icon}</span>
                              </div>
                          </div>

                          {/* TEXT STYLING */}
                          <h3 className="text-xl font-raleway font-extrabold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                      </motion.div>
                  );
              })}
          </div>
      </motion.section>

      {/* Offers & Discounts */}
      <motion.section ref={offersRef} initial="hidden" animate={offersInView ? 'visible' : 'hidden'} variants={variants} className="py-20">
                  
          {/* Use the bold, modern heading style */}
          <h2 className="text-4xl md:text-5xl font-raleway font-extrabold text-stone-800 text-center mb-16 tracking-tight">
              Offers & Discounts
          </h2>
                  
          <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {offers.map((offer, index) => (
                  <motion.div 
                      key={index} 
                      // Updated Card Style: Clean white background, strong shadow, and rounded corners
                      className="rounded-xl shadow-xl overflow-hidden flex flex-col items-center bg-white border border-gray-100 min-h-[300px]" 
                      variants={variants} 
                      custom={index} 
                      whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                  >
                      
                      {/* Image Section - Takes up the top half */}
                      <SmartImage 
                          src={offer.image} 
                          alt={offer.title} 
                          // Set a fixed height for consistency and object-cover for full fill
                          className="w-full h-48 object-cover" 
                          fallback="/assets/placeholder-300x200.png" 
                          altTextFallback={offer.title} 
                      />
                      
                      {/* Content Section - Displayed below the image */}
                      <div className="p-6 flex-1 flex flex-col justify-between items-center text-center w-full bg-blue-100">
                          <div>
                              {/* Offer Title in a large, prominent red color */}
                              <h3 className="text-3xl font-raleway font-bold text-red-500 mb-2">
                                  {offer.title}
                              </h3>
                              {/* Offer Description */}
                              <p className="text-gray-600 text-base">{offer.description}</p>
                          </div>
                          
                          {/* Grab Offer Button - Prominent and centered at the bottom */}
                          <motion.button 
                              className="mt-6 bg-orange-500 text-white px-8 py-3 rounded-full font-raleway font-semibold hover:bg-red-500 transition-colors shadow-lg" 
                              whileHover={{ scale: 1.05 }}
                          >
                              Grab Offer
                          </motion.button>
                      </div>
                  </motion.div>
              ))}
          </div>
      </motion.section>

      {/* App Promo */}
      <motion.section 
          ref={appPromoRef} 
          initial="hidden" 
          animate={appPromoInView ? 'visible' : 'hidden'} 
          variants={variants} 
          className="py-20" // Consistent light background
      >
          {/* Heading consistent with other sections */}
          <h2 className="text-4xl md:text-5xl font-raleway font-extrabold text-stone-800 text-center mb-16 tracking-tight">
              Download Our App
          </h2>

          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24"> {/* Increased gap */}

              {/* Left Content Area */}
              <motion.div variants={variants} className="flex-1 text-center md:text-left max-w-lg">
                  {/* Main Headline - Larger and bolder */}
                  <h3 className="text-3xl md:text-4xl font-raleway font-extrabold text-gray-900 mb-6 leading-tight">
                      Order Anywhere, Anytime
                  </h3>
                  <p className="text-gray-700 text-lg mb-8">
                      Experience seamless ordering with our beautifully designed mobile app, 
                      tailored for your convenience.
                  </p>

                  {/* Added a subtle list of benefits to fill space and add value */}
                  <ul className="text-gray-600 text-base list-disc list-inside space-y-2 mb-8 md:mb-10">
                      <li><strong className="text-gray-800">Exclusive Deals:</strong> Access app-only discounts.</li>
                      <li><strong className="text-gray-800">Track Your Order:</strong> Real-time updates from kitchen to door.</li>
                      <li><strong className="text-gray-800">Easy Re-ordering:</strong> Your favorites, just a tap away.</li>
                  </ul>

                  {/* Download Buttons - More prominent styling */}
                  <div className="flex justify-center md:justify-start space-x-4">
                      <motion.button 
                          className="flex items-center gap-2 bg-red-500 text-white px-7 py-3 rounded-full font-raleway font-semibold hover:bg-red-600 transition-colors shadow-lg text-lg" 
                          whileHover={{ scale: 1.05 }}
                      >
                          <FaAppStoreIos className="text-xl" /> App Store
                      </motion.button>
                      <motion.button 
                          className="flex items-center gap-2 bg-orange-500 text-white px-7 py-3 rounded-full font-raleway font-semibold hover:bg-orange-600 transition-colors shadow-lg text-lg" 
                          whileHover={{ scale: 1.05 }}
                      >
                          <FaGooglePlay className="text-xl" /> Play Store
                      </motion.button>
                  </div>
              </motion.div>

              {/* Right Image Area (using mobileMockup from your assets) */}
              <motion.div variants={variants} className="flex-1 flex justify-center md:justify-end">
                  <SmartImage 
                      src={mobileMockup} // This is the key change: use your app mockup image
                      alt="QuickServe Mobile App Interface" 
                      // Increased max-width for prominence and added a border for a sleek look
                      className="w-full max-w-sm md:max-w-md h-auto rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500" 
                      fallback="/assets/placeholder-300x600.png" 
                  />
              </motion.div>
          </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section ref={testimonialsRef} initial="hidden" animate={testimonialsInView ? 'visible' : 'hidden'} variants={variants} className="py-20">
        <h2 className="text-3xl md:text-4xl font-raleway font-bold text-gray-900 text-center mb-12">What Our Customers Say</h2>
        <div className="container mx-auto px-4">
          <Carousel showThumbs={false} autoPlay infiniteLoop interval={4000} showStatus={false} showArrows={true}>
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} className="p-8 bg-blue-100 rounded-xl shadow-lg max-w-2xl mx-auto flex flex-col items-center text-center" variants={variants}>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-red-400 flex items-center justify-center bg-gray-100">
                    <SmartImage src={testimonial.avatar} alt={testimonial.name} className="w-full h-full rounded-full object-cover" fallback="/assets/images/avatar.png" />
                  </div>
                  <p className="font-raleway font-bold text-gray-900">{testimonial.name}</p>
                </div>
                <p className="text-gray-700 text-lg">&quot;{testimonial.text}&quot;</p>
              </motion.div>
            ))}
          </Carousel>
        </div>
      </motion.section>

      {/* Closing CTA */}
      <motion.section ref={ctaRef} initial="hidden" animate={ctaInView ? 'visible' : 'hidden'} variants={variants} className="py-20 text-center text-white">
        <h2 className="text-3xl md:text-4xl text-black font-raleway font-bold mb-8">Ready to Order?</h2>
        <motion.p className="text-lg text-red-500 mb-8 max-w-xl mx-auto" variants={variants}>
          Join thousands of food lovers and experience culinary delight today.
        </motion.p>
        <motion.button className="bg-red-600 text-white px-8 py-3 rounded-full font-raleway font-semibold hover:bg-orange-500  transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-lg" variants={variants} whileHover={{ scale: 1.05 }}>
          Order Now
        </motion.button>
      </motion.section>
    </div>
  );
};

export default Home;
  