import { useState } from "react";
import { Star, Search, Filter, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion"; // Add motion for subtle effects

// =========================================================================
// COLOR PALETTE
// Matches the Explore page for consistency
// =========================================================================
const COLORS = {
    BG_MAIN: 'bg-blue-50',
    BG_CARD: 'bg-white',
    TEXT_PRIMARY: 'text-stone-800',
    CTA_PRIMARY: 'bg-red-600',
    CTA_HOVER: 'bg-orange-500',
    ACCENT_STAR: 'text-yellow-500',
};

// =========================================================================
// MOCK DATA (Image URLs replaced with simple placeholders)
// =========================================================================
const restaurantsData = [
    {
        id: 1,
        name: "Biryani House",
        cuisine: "Indian, Biryani",
        rating: 4.5,
        deliveryTime: "30-40 mins",
        price: "₹300 for two",
        image: "biryani",
        tags: ["Bestseller", "Spicy"],
    },
    {
        id: 2,
        name: "Pizza Palace",
        cuisine: "Italian, Pizza",
        rating: 4.2,
        deliveryTime: "25-35 mins",
        price: "₹500 for two",
        image: "pizza",
        tags: ["Italian", "Quick"],
    },
    {
        id: 3,
        name: "Healthy Bowl",
        cuisine: "Salads, Continental",
        rating: 4.8,
        deliveryTime: "20-30 mins",
        price: "₹350 for two",
        image: "salad",
        tags: ["Healthy", "Vegetarian"],
    },
    {
        id: 4,
        name: "Street Food Hub",
        cuisine: "Snacks, Fast Food",
        rating: 4.1,
        deliveryTime: "15-25 mins",
        price: "₹200 for two",
        image: "fastfood",
        tags: ["Budget", "Quick"],
    },
    {
        id: 5,
        name: "Wok Express",
        cuisine: "Chinese, Noodles",
        rating: 4.6,
        deliveryTime: "35-45 mins",
        price: "₹450 for two",
        image: "chinese",
        tags: ["Spicy"],
    },
    {
        id: 6,
        name: "Dessert Delight",
        cuisine: "Sweets, Cakes",
        rating: 4.9,
        deliveryTime: "15-20 mins",
        price: "₹400 for two",
        image: "dessert",
        tags: ["Sweet", "Quick"],
    },
];

// Inline SmartImage for consistency and placeholder stability
const SmartImage = ({ alt, className, altTextFallback }) => {
    const text = altTextFallback ? altTextFallback.replace(/\s/g, '+') : 'Restaurant';
    const placeholder = `https://placehold.co/400x200/D1F3FF/222?text=${text}`;
    return (
        <img
            src={placeholder}
            alt={alt}
            className={className}
            loading="lazy"
        />
    );
};


export default function Restaurants() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("rating"); // Default sort by rating
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filter Logic
    let filteredRestaurants = restaurantsData.filter((res) =>
        res.name.toLowerCase().includes(search.toLowerCase()) ||
        res.cuisine.toLowerCase().includes(search.toLowerCase())
    );

    // Sort Logic
    filteredRestaurants.sort((a, b) => {
        if (sortBy === "rating") {
            return b.rating - a.rating; // Highest rating first
        }
        if (sortBy === "deliveryTime") {
            // Simple string comparison for delivery time
            return a.deliveryTime.localeCompare(b.deliveryTime); 
        }
        if (sortBy === "price") {
            // Crude comparison based on first number in price string
            const priceA = parseInt(a.price.match(/\d+/)[0]);
            const priceB = parseInt(b.price.match(/\d+/)[0]);
            return priceA - priceB; // Lowest price first
        }
        return 0;
    });

    // Helper to extract numeric part of delivery time for sorting clarity
    const getSortButtonText = () => {
        if (sortBy === 'deliveryTime') return 'Delivery Time';
        if (sortBy === 'price') return 'Price (Low to High)';
        return 'Rating (High to Low)';
    };

    return (
        <div className={`min-h-screen ${COLORS.BG_MAIN} font-nunito`}>
            
            {/* Header and Search Bar */}
            <div className={`${COLORS.BG_CARD} shadow-md p-6 top-0 z-10`}>
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h1 className={`text-3xl font-bold font-raleway ${COLORS.TEXT_PRIMARY}`}>
                        All Restaurants 🍴
                    </h1>
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                        
                        {/* Search */}
                        <div className="relative w-full sm:w-72">
                            <input
                                type="text"
                                placeholder="Search by name or cuisine..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-red-500 focus:outline-none transition-all ${COLORS.BG_MAIN}`}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-500 h-5 w-5" />
                        </div>
                        
                        {/* Filters/Sort Button */}
                        <button 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={`flex items-center space-x-2 px-4 py-2 ${COLORS.CTA_PRIMARY} text-white rounded-full font-semibold hover:${COLORS.CTA_HOVER} transition shadow-lg`}
                        >
                            <Filter className="h-5 w-5" />
                            <span>Sort By</span>
                        </button>
                    </div>
                </div>

                {/* Sort/Filter Dropdown */}
                {isFilterOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-3"
                    >
                        <span className="text-sm font-semibold text-gray-600 flex items-center">
                            Current: {getSortButtonText()}
                        </span>
                        {['rating', 'deliveryTime', 'price'].map(key => (
                            <button
                                key={key}
                                onClick={() => {setSortBy(key); setIsFilterOpen(false);}}
                                className={`px-3 py-1 text-sm rounded-full transition ${
                                    sortBy === key 
                                    ? `${COLORS.CTA_HOVER} text-white` 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {key === 'rating' ? 'Highest Rating' : key === 'deliveryTime' ? 'Fastest Delivery' : 'Lowest Price'}
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Restaurant Grid */}
            <div className="max-w-7xl mx-auto p-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant) => (
                        <motion.div
                            key={restaurant.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * restaurant.id }}
                            className={`${COLORS.BG_CARD} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100`}
                        >
                            <SmartImage
                                alt={restaurant.name}
                                className="w-full h-40 object-cover"
                                altTextFallback={restaurant.name}
                            />
                            <div className="p-4">
                                <h3 className={`text-xl font-raleway font-bold ${COLORS.TEXT_PRIMARY} mb-1`}>
                                    {restaurant.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-3">{restaurant.cuisine}</p>
                                
                                {/* Info Row */}
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center font-medium">
                                        <Star className={`h-4 w-4 ${COLORS.ACCENT_STAR} mr-1`} fill={COLORS.ACCENT_STAR.replace('text-', '')} />
                                        <span className="text-gray-800">
                                            {restaurant.rating}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-500">
                                        <Clock className="h-4 w-4 mr-1" />
                                        <span>{restaurant.deliveryTime}</span>
                                    </div>
                                    <div className="text-gray-700 font-semibold">
                                        {restaurant.price}
                                    </div>
                                </div>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {restaurant.tags.map(tag => (
                                        <span key={tag} className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <button className={`mt-4 w-full py-2 ${COLORS.CTA_PRIMARY} text-white font-semibold rounded-lg hover:${COLORS.CTA_HOVER} transition shadow-md`}>
                                    View Menu
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-600 py-10">
                        No restaurants matching your search or filters were found.
                    </p>
                )}
            </div>
        </div>
    );
}