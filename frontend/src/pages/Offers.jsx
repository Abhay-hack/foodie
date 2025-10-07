// src/pages/Offers.jsx
import { Sparkles, Gift, Percent } from "lucide-react";

const offersData = [
  {
    id: 1,
    festival: "Navratri Special",
    description: "Up to 50% OFF on Falahari Thalis & Healthy Meals 🍽️",
    validity: "Valid till Oct 12, 2025",
    code: "NAVRATRI50",
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
];

export default function Offers() {
  return (
    <div className="min-h-screen bg-gray-50 font-nunito">
      {/* Header */}
      <div className="bg-white shadow p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">🎉 Festival Offers</h1>
        <p className="text-gray-500 mt-2">
          Celebrate Indian festivals with exciting food deals!
        </p>
      </div>

      {/* Offers Grid */}
      <div className="max-w-6xl mx-auto p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {offersData.map((offer) => (
          <div
            key={offer.id}
            className={`${offer.bgColor} rounded-2xl shadow hover:shadow-lg transition p-6`}
          >
            <div className="flex items-center space-x-3 mb-4">
              {offer.icon}
              <h3 className={`text-xl font-bold ${offer.textColor}`}>
                {offer.festival}
              </h3>
            </div>
            <p className="text-gray-700">{offer.description}</p>
            <p className="mt-2 text-sm text-gray-500">{offer.validity}</p>
            <div className="mt-4">
              <span className="px-3 py-1 bg-white border rounded-lg text-sm font-semibold text-gray-800 shadow-sm">
                Code: {offer.code}
              </span>
            </div>
            <button className="mt-5 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
              Apply Offer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
