import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Copy, X } from 'lucide-react';

const OfferPopup = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered && isOpen) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            setIsOpen(false);
            onClose();
            return 0;
          }
          return prev - (100 / (5 * 60));
        });
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isHovered, isOpen, onClose]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FOODIE25').then(() => {
      toast.success('Code FOODIE25 copied!', {
        position: 'top-right',
        autoClose: 2000,
      });
    }).catch(() => {
      toast.error('Failed to copy code.', {
        position: 'top-right',
        autoClose: 2000,
      });
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full 
            rounded-2xl shadow-xl p-6 font-nunito 
            bg-white/70 backdrop-blur-md border border-white/40"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="dialog"
          aria-labelledby="offer-title"
          aria-describedby="offer-description"
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 text-dark-charcoal hover:text-tomato-red 
              transition-colors focus:outline-none"
            onClick={handleClose}
            aria-label="Close Offer Popup"
          >
            <X size={22} />
          </button>

          {/* Title */}
          <h3 id="offer-title" className="text-xl font-raleway font-bold text-dark-charcoal mb-2">
            🎉 Limited Time Offer!
          </h3>

          {/* Description */}
          <p id="offer-description" className="text-sm text-dark-charcoal/80 mb-5">
            Get <span className="font-bold">25% OFF</span> on orders over ₹299.  
            Use code <span className="font-bold text-tomato-red">FOODIE25</span>.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              className="flex-1 bg-tomato-red hover:bg-warm-orange 
                text-white text-sm font-raleway font-medium py-2.5 rounded-lg 
                transition-all shadow-md hover:shadow-lg 
                focus:outline-none flex items-center justify-center gap-2"
              onClick={handleCopyCode}
              aria-label="Copy discount code FOODIE25"
            >
              <Copy size={16} />
              Copy Code
            </button>
            <button
              className="flex-1 bg-dark-charcoal hover:bg-warm-orange 
                text-white text-sm font-raleway font-medium py-2.5 rounded-lg 
                transition-all shadow-md hover:shadow-lg focus:outline-none"
              onClick={() => (window.location.href = '/cart')}
              aria-label="Go to Checkout"
            >
              Checkout
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 h-1.5 bg-gray-200/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-tomato-red to-warm-orange shadow-inner"
              initial={{ width: '100%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.0167, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfferPopup;
