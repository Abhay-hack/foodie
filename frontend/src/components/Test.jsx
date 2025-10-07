import React from 'react';

const Test = () => (
  <div className="bg-soft-white min-h-screen font-nunito">
    <h1 className="text-4xl font-raleway text-tomato-red text-center py-12">Test Page</h1>
    <div className="bg-tomato-red text-soft-white p-4 mx-auto max-w-md rounded-lg animate-pulse-slow">
      Testing Tailwind Colors
    </div>
    <div className="bg-cream-50 text-orange-800 p-4 mx-auto max-w-md rounded-lg mt-4">
      Testing Legacy Colors
    </div>
  </div>
);

export default Test;