// frontend/src/pages/AboutUs.jsx (or wherever you prefer to put pages)
import React from 'react';
import team from '../assets/team.png';
import fresh from '../assets/fresh.png';
const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">About Us</h1>

      {/* Our Story Section */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to [Your Restaurant Name]! Our journey began with a simple passion: to bring authentic,
              heartfelt [Cuisine Type, e.g., Indian, Italian, Fusion] dishes to our community.
              Founded in [Year], we started as a small dream, fueled by a love for culinary
              traditions and a desire to create memorable dining experiences.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Over the years, we've grown, but our core values remain the same:
              fresh ingredients, exceptional flavors, and a warm, inviting atmosphere.
              Every dish tells a story, and we invite you to be a part of ours.
            </p>
          </div>
          <div className="md:w-1/2">
            {/* Image 1: Cozy Restaurant Interior */}
            <img
              src={team}
              alt="Cozy restaurant interior with customers"
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row-reverse items-center gap-8"> {/* Reverse order for image on right */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our mission is to delight your senses with every bite. We are committed to
              sourcing the freshest, highest-quality ingredients, preparing them with
              skill and passion, and serving them with genuine hospitality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We strive to be more than just a restaurant; we aim to be a place where
              friends and family gather, celebrate, and create cherished memories over
              delicious food.
            </p>
          </div>
          <div className="md:w-1/2">
            {/* Image 2: Fresh Ingredients */}
            <img
              src={fresh}
              alt="Close-up of fresh ingredients being prepared"
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section (Optional: You can add another image if you generate one, or remove this section) */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-700 mb-4 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold text-green-600 mb-2">Quality</h3>
            <p className="text-gray-600 text-sm">
              We never compromise on the quality of our ingredients and the excellence of our dishes.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold text-green-600 mb-2">Hospitality</h3>
            <p className="text-gray-600 text-sm">
              Every guest is treated like family, with warmth and attentive service.
            </p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-xl font-bold text-green-600 mb-2">Innovation</h3>
            <p className="text-gray-600 text-sm">
              While respecting tradition, we embrace creativity to bring you exciting new flavors.
            </p>
          </div>
        </div>
      </section>

      {/* You can add a team photo section here if you generate a team image */}
      {/*
      <section className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Meet Our Team</h2>
        <div className="flex justify-center">
          <img
            src="[URL_FOR_TEAM_IMAGE]" // Replace with your team image URL
            alt="Our dedicated team"
            className="w-full md:w-3/4 lg:w-1/2 h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <p className="text-center text-gray-600 mt-4">
          Behind every delicious dish and warm smile is our incredible team, dedicated to making your experience unforgettable.
        </p>
      </section>
      */}

    </div>
  );
};

export default AboutUs;