import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  // Always fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setProfile({ name: "", email: "" });
        toast.error("Not logged in!");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Save profile
      fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Update failed");
          return res.json();
        })
        .then((data) => {
          setProfile({ name: data.name, email: data.email });
          setIsEditing(false);
          toast.success("Profile updated!");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to update profile");
        });
    } else {
      setIsEditing(true);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        // Clear any localStorage data
        localStorage.removeItem("user");

        // Notify Navbar
        window.dispatchEvent(new Event("storage"));

        navigate("/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 font-poppins flex items-center justify-center px-6">
        <p className="text-xl text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 font-poppins flex items-center justify-center px-6 py-12">
      <motion.div
        className="bg-white shadow-md rounded-2xl w-full max-w-md p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaUserCircle className="text-7xl text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-orange-800 mb-2">
          {profile.name}
        </h2>
        <p className="text-gray-700 mb-6">{profile.email}</p>

        {isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <FaUserCircle className="mr-2 text-gray-500" />
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full outline-none focus:ring-2 focus:ring-orange-400 rounded-lg"
                aria-label="Name"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg p-3">
              <FaEnvelope className="mr-2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full outline-none focus:ring-2 focus:ring-orange-400 rounded-lg"
                aria-label="Email"
              />
            </div>
            <button
              onClick={handleEditToggle}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Save Profile"
            >
              <FaSave className="inline-block mr-2" /> Save
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleEditToggle}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label="Edit Profile"
            >
              <FaEdit className="inline-block mr-2" /> Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Logout"
            >
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
