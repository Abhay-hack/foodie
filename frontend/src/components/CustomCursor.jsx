// src/components/CustomCursor.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [sparks, setSparks] = useState([]);
  // Use a stable ref for the spark ID counter
  const nextSparkId = useRef(0);

  // Use useCallback to memoize createSpark, but ensure ID generation is safe
  const createSpark = useCallback((x, y) => {
    // Generate a new unique ID for THIS spark
    const id = nextSparkId.current++; // Increment AFTER assigning the current value

    setSparks((prevSparks) => [
      ...prevSparks,
      {
        id: id, // Use the generated unique ID
        x: x,
        y: y,
        timestamp: Date.now(),
      },
    ]);
  }, []); // Empty dependency array, as it now takes x, y as args

  useEffect(() => {
    let lastSparkTime = 0;
    const sparkInterval = 40; // Milliseconds between sparks for a dense line

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Create sparks periodically while moving
      if (Date.now() - lastSparkTime > sparkInterval) {
        createSpark(e.clientX, e.clientY); // Pass current mouse position
        lastSparkTime = Date.now();
      }
    };

    const handleMouseDown = (e) => {
      setIsClicked(true);
      createSpark(e.clientX, e.clientY); // Create a spark immediately on click
    };
    const handleMouseUp = () => setIsClicked(false);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp); // Use removeEventListener if it's there, but add it if not.
    document.addEventListener('mouseup', handleMouseUp); // Ensure it's correctly added

    // Cleanup function for event listeners
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [createSpark]); // Dependency on createSpark now correctly handled by useCallback

  // Effect to clean up old sparks
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setSparks((prevSparks) =>
        prevSparks.filter((spark) => now - spark.timestamp < 600) // Keep sparks for 600ms
      );
    }, 100); // Check and clean up every 100ms

    // Cleanup interval on unmount
    return () => clearInterval(cleanupInterval);
  }, []);

  return (
    <>
      {/* The main cursor dot (small, vibrant) */}
      <div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out 
                   bg-red-500 transform -translate-x-1/2 -translate-y-1/2
                   ${isClicked ? 'scale-150' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      ></div>

      {/* Render the individual spark particles */}
      {sparks.map((spark) => (
        <div
          key={spark.id} // This is where the unique key is crucial
          className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9997] 
                     bg-yellow-300 transform -translate-x-1/2 -translate-y-1/2
                     opacity-0 animate-sparkle`} // opacity-0 and animate-sparkle are key
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            animationDuration: '0.6s', // Matches the 600ms cleanup
            animationFillMode: 'forwards', // Ensures it stays at its end state (transparent)
          }}
        ></div>
      ))}
    </>
  );
};

export default CustomCursor;