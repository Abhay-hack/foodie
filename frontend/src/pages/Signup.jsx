import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebase";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData,
        { withCredentials: true } // include HttpOnly cookie
      );
      toast.success("Signup successful!", { position: "top-right" });
      console.log(res.data);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed!", { position: "top-right" });
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithRedirect(auth, provider);
      // Redirects to Google; result handled in useEffect
    } catch (err) {
      console.error(err);
      toast.error("Google signup failed!", { position: "top-right" });
    }
  };

  // Handle Google redirect result after returning from Google login
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          const user = result.user;
          const res = await axios.post(
            "http://localhost:5000/api/auth/signup",
            {
              name: user.displayName,
              email: user.email,
              password: user.uid, // you can use uid as password
              role: "customer",
              googleAuth: true,
              firebaseUid: user.uid,
            },
            { withCredentials: true }
          );
          toast.success("Google signup successful!", { position: "top-right" });
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google signup failed!", { position: "top-right" });
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-cream-50 font-poppins flex items-center justify-center px-6 py-12">
      <motion.div
        className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-orange-800 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              aria-label="Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              aria-label="Email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              aria-label="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            aria-label="Sign Up"
          >
            Sign Up
          </button>
        </form>
        <div className="my-6 text-center text-gray-600">or</div>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Sign up with Google"
        >
          <FcGoogle className="text-xl" /> Sign up with Google
        </button>
        <p className="text-center text-sm text-gray-700 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:text-orange-600 font-medium underline"
            aria-label="Login"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
