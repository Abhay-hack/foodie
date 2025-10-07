import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Success from '../pages/Success';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import Explore from '../pages/Explore';
import Restaurants from '../pages/Reastaurants';
import Offers from '../pages/Offers';
import Test from '../components/Test';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/success" element={<Success />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};
export default AppRoutes;