import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import SmartImage from '../components/SmartImage';
import teamImg from '../assets/team.png';
import freshImg from '../assets/fresh.png';

const About = () => {
  const team = [
    { id: 1, name: 'John Doe', role: 'Founder', image: '/assets/team-john-doe.jpg' },
    { id: 2, name: 'Jane Smith', role: 'Chef', image: '/assets/team-jane-smith.jpg' },
    { id: 3, name: 'Alex Brown', role: 'Delivery Manager', image: '/assets/team-alex-brown.jpg' },
  ];
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);

  const storyInView = useInView(storyRef, { once: true, threshold: 0.2 });
  const missionInView = useInView(missionRef, { once: true, threshold: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, threshold: 0.2 });
  const teamInView = useInView(teamRef, { once: true, threshold: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-soft-white font-nunito py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          className="text-4xl md:text-5xl font-raleway font-bold text-center text-dark-charcoal mb-12 animate-pulse-slow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TypeAnimation
            sequence={['About QuickServe', 2000, 'Our Passion for Food', 2000]}
            wrapper="span"
            cursor={true}
            aria-label="Animated headline"
          />
        </motion.h1>

        <motion.section
          ref={storyRef}
          initial="hidden"
          animate={storyInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-12 bg-soft-white p-8 rounded-2xl shadow-md"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-raleway font-semibold text-dark-charcoal mb-4">Our Story</h2>
              <p className="text-dark-charcoal leading-relaxed mb-4 text-base">
                Welcome to QuickServe! Our journey began with a simple passion: to bring authentic,
                heartfelt dishes to our community. Founded in 2023, we started as a small dream,
                fueled by a love for culinary traditions and a desire to create memorable dining experiences.
              </p>
              <p className="text-dark-charcoal leading-relaxed text-base">
                Over the years, we've grown, but our core values remain the same:
                fresh ingredients, exceptional flavors, and a warm, inviting atmosphere.
                Every dish tells a story, and we invite you to be a part of ours.
              </p>
              <motion.button
                as="a"
                href="/explore"
                className="mt-4 bg-tomato-red text-soft-white px-6 py-2 rounded-full font-raleway font-medium hover:bg-warm-orange transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-warm-orange animate-sparkle"
                variants={variants}
                aria-label="Explore Our Menu"
              >
                Explore Our Menu
              </motion.button>
            </div>
            <div className="md:w-1/2">
              <SmartImage
                src={teamImg}
                alt="Cozy restaurant interior with customers"
                className="w-full h-72 object-cover rounded-lg shadow-lg animate-pulse-slow"
                fallback="/assets/placeholder-team.png"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={missionRef}
          initial="hidden"
          animate={missionInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-12 bg-soft-white p-8 rounded-2xl shadow-md"
        >
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-raleway font-semibold text-dark-charcoal mb-4">Our Mission</h2>
              <p className="text-dark-charcoal leading-relaxed mb-4 text-base">
                Our mission is to delight your senses with every bite. We are committed to
                sourcing the freshest, highest-quality ingredients, preparing them with
                skill and passion, and serving them with genuine hospitality.
              </p>
              <p className="text-dark-charcoal leading-relaxed text-base">
                We strive to be more than just a restaurant; we aim to be a place where
                friends and family gather, celebrate, and create cherished memories over
                delicious food.
              </p>
            </div>
            <div className="md:w-1/2">
              <SmartImage
                src={freshImg}
                alt="Close-up of fresh ingredients being prepared"
                className="w-full h-72 object-cover rounded-lg shadow-lg animate-pulse-slow"
                fallback="/assets/placeholder-fresh.png"
              />
            </div>
          </div>
        </motion.section>

        <motion.section
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? 'visible' : 'hidden'}
          variants={variants}
          className="mb-12 bg-soft-white p-8 rounded-2xl shadow-md"
        >
          <h2 className="text-3xl font-raleway font-semibold text-dark-charcoal mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div
              className="p-4 border border-dark-charcoal rounded-lg animate-pulse-slow"
              variants={variants}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <h3 className="text-xl font-raleway font-bold text-tomato-red mb-2">Quality</h3>
              <p className="text-dark-charcoal text-sm">
                We never compromise on the quality of our ingredients and the excellence of our dishes.
              </p>
            </motion.div>
            <motion.div
              className="p-4 border border-dark-charcoal rounded-lg animate-pulse-slow"
              variants={variants}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <h3 className="text-xl font-raleway font-bold text-tomato-red mb-2">Hospitality</h3>
              <p className="text-dark-charcoal text-sm">
                Every guest is treated like family, with warmth and attentive service.
              </p>
            </motion.div>
            <motion.div
              className="p-4 border border-dark-charcoal rounded-lg animate-pulse-slow"
              variants={variants}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
            >
              <h3 className="text-xl font-raleway font-bold text-tomato-red mb-2">Innovation</h3>
              <p className="text-dark-charcoal text-sm">
                While respecting tradition, we embrace creativity to bring you exciting new flavors.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          ref={teamRef}
          initial="hidden"
          animate={teamInView ? 'visible' : 'hidden'}
          variants={variants}
          className="bg-soft-white p-8 rounded-2xl shadow-md"
        >
          <h2 className="text-3xl font-raleway font-semibold text-dark-charcoal mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member) => (
              <motion.div
                key={member.id}
                className="bg-soft-white rounded-lg shadow-md p-4 text-center hover:scale-105 transition-transform duration-300 animate-pulse-slow"
                variants={variants}
                whileHover={{ boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
              >
                <SmartImage
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                  fallback="/assets/placeholder-avatar.png"
                  altTextFallback={member.name}
                />
                <h3 className="text-xl font-raleway font-bold text-dark-charcoal">{member.name}</h3>
                <p className="text-fresh-green text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;