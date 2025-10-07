import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [sparks, setSparks] = useState([]);
  const nextSparkId = useRef(0);

  const createSpark = useCallback((x, y) => {
    const id = nextSparkId.current++;
    setSparks((prevSparks) => [
      ...prevSparks,
      {
        id,
        x,
        y,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  useEffect(() => {
    let lastSparkTime = 0;
    const sparkInterval = 60;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (Date.now() - lastSparkTime > sparkInterval) {
        createSpark(e.clientX, e.clientY);
        lastSparkTime = Date.now();
      }
    };

    const handleMouseDown = (e) => {
      setIsClicked(true);
      createSpark(e.clientX, e.clientY);
    };
    const handleMouseUp = () => setIsClicked(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [createSpark]);

  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setSparks((prevSparks) =>
        prevSparks.filter((spark) => now - spark.timestamp < 600)
      );
    }, 100);

    return () => clearInterval(cleanupInterval);
  }, []);

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] bg-tomato-red transform -translate-x-1/2 -translate-y-1/2 ${
          isClicked ? 'scale-150' : ''
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      ></motion.div>
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          className="fixed top-0 left-0 w-1 h-1 rounded-full pointer-events-none z-[9997] bg-fresh-green"
          style={{ left: `${spark.x}px`, top: `${spark.y}px` }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6 }}
        ></motion.div>
      ))}
    </>
  );
};

export default CustomCursor;