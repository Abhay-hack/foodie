import React, { useState } from "react";
import { Sparkles, Gift, Percent, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

// =========================================================================
// COLOR PALETTE
// Matches the Explore and Restaurants pages for consistency
// =========================================================================
const COLORS = {
    BG_MAIN: 'bg-blue-50',
    BG_CARD: 'bg-white',
    TEXT_PRIMARY: 'text-stone-800',
    CTA_PRIMARY: 'bg-red-600',
    CTA_HOVER: 'bg-orange-500',
};

// =========================================================================
// MOCK DATA (Using existing festival themes)
// =========================================================================
const offersData = [
    {
        id: 1,
        festival: "Navratri Special",
        description: "Up to 50% OFF on Falahari Thalis & Healthy Meals 🍽️",
        validity: "Valid till Oct 12, 2025",
        code: "NAVRATRI50",
        // Keeping diverse background colors for visual distinction between offers
        bgColor: "bg-green-100", 
        textColor: "text-green-700",
        icon: <Sparkles className="h-8 w-8 text-green-600" />,
    },
    {
        id: 2,
        festival: "Diwali Dhamaka",
        description: "Flat 40% OFF on Sweets & Snacks 🪔",
        validity: "Valid till Oct 22, 2025",
        code: "DIWALI40",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
        icon: <Gift className="h-8 w-8 text-yellow-600" />,
    },
    {
        id: 3,
        festival: "Holi Hungama",
        description: "Cool Thandai & Snacks at 25% OFF 🌈",
        validity: "Valid till Mar 25, 2025",
        code: "HOLI25",
        bgColor: "bg-pink-100",
        textColor: "text-pink-700",
        icon: <Gift className="h-8 w-8 text-pink-600" />,
    },
    {
        id: 4,
        festival: "First Order Treat",
        description: "Get ₹100 OFF on your first order above ₹299! 🥳",
        validity: "New users only",
        code: "WELCOME100",
        bgColor: "bg-blue-100",
        textColor: "text-blue-700",
        icon: <Percent className="h-8 w-8 text-blue-600" />,
    },
];

export default function Offers() {
    // State to manage which coupon code was recently copied
    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopyCode = (code) => {
        // Use the clipboard API to copy the text
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(() => {
                setCopiedCode(code);
                // Reset the "Copied!" message after 2 seconds
                setTimeout(() => setCopiedCode(null), 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
                // Fallback for older browsers (or if permission is denied)
                alert(`Coupon code copied: ${code}`); 
            });
        }
    };

    return (
        <div className={`min-h-screen ${COLORS.BG_MAIN} font-nunito`}>
            {/* Header */}
            <div className={"p-8 text-center top-0 z-10 border-b border-gray-200"}>
                <h1 className={`text-4xl font-extrabold font-raleway ${COLORS.TEXT_PRIMARY}`}>
                    🎉 All Deals & Offers
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Celebrate every day with exciting food deals and discounts!
                </p>
            </div>

            {/* Offers Grid */}
            <div className="max-w-7xl mx-auto p-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {offersData.map((offer, index) => (
                    <motion.div
                        key={offer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`${offer.bgColor} rounded-3xl shadow-xl hover:shadow-2xl transition-all p-6 border-b-4 border-opacity-50`}
                    >
                        {/* Offer Header */}
                        <div className="flex items-center space-x-3 mb-4">
                            {offer.icon}
                            <h3 className={`text-xl font-bold font-raleway ${offer.textColor}`}>
                                {offer.festival}
                            </h3>
                        </div>
                        
                        {/* Offer Description */}
                        <p className="text-gray-700 text-base font-medium">{offer.description}</p>
                        <p className="mt-3 text-sm text-gray-500 font-semibold">{offer.validity}</p>

                        {/* Coupon Code & Copy Button */}
                        <div className="mt-5">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleCopyCode(offer.code)}
                                className="w-full flex items-center justify-between px-4 py-2 bg-white border border-dashed border-gray-300 rounded-xl text-lg font-mono font-bold text-gray-800 shadow-sm transition-all hover:bg-gray-50"
                            >
                                <span className="tracking-widest">{offer.code}</span>
                                {copiedCode === offer.code ? (
                                    <div className="flex items-center text-green-600 text-sm">
                                        <Check className="h-5 w-5 mr-1" /> Copied!
                                    </div>
                                ) : (
                                    <Copy className="h-5 w-5 text-gray-500" />
                                )}
                            </motion.button>
                        </div>
                        
                        {/* Action Button */}
                        <button className={`mt-5 w-full py-2 ${COLORS.CTA_PRIMARY} text-white font-semibold rounded-xl hover:${COLORS.CTA_HOVER} transition shadow-md`}>
                            Shop Now
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}