// src/pages/Restaurants.jsx
import { useState } from "react";
import { Star, Search, Filter } from "lucide-react";

const restaurantsData = [
  {
    id: 1,
    name: "Biryani House",
    cuisine: "Indian, Biryani",
    rating: 4.5,
    deliveryTime: "30-40 mins",
    price: "₹300 for two",
    image: "https://source.unsplash.com/400x300/?biryani,food",
  },
  {
    id: 2,
    name: "Pizza Palace",
    cuisine: "Italian, Pizza",
    rating: 4.2,
    deliveryTime: "25-35 mins",
    price: "₹500 for two",
    image: "https://source.unsplash.com/400x300/?pizza,food",
  },
  {
    id: 3,
    name: "Healthy Bowl",
    cuisine: "Salads, Continental",
    rating: 4.8,
    deliveryTime: "20-30 mins",
    price: "₹350 for two",
    image: "https://source.unsplash.com/400x300/?salad,healthy",
  },
  {
    id: 4,
    name: "Street Food Hub",
    cuisine: "Snacks, Fast Food",
    rating: 4.1,
    deliveryTime: "15-25 mins",
    price: "₹200 for two",
    image: "https://source.unsplash.com/400x300/?streetfood,fastfood",
  },
];

export default function Restaurants() {
  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurantsData.filter((res) =>
    res.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-nunito">
      {/* Header */}
      <div className="bg-white shadow p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Restaurants</h1>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search for restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
          </div>
          {/* Filters Button */}
          <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="max-w-7xl mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {restaurant.name}
                </h3>
                <p className="text-gray-500 text-sm">{restaurant.cuisine}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-gray-700 font-medium">
                    {restaurant.rating}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{restaurant.deliveryTime}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{restaurant.price}</p>
                <button className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                  View Menu
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No restaurants found.
          </p>
        )}
      </div>
    </div>
  );
}
