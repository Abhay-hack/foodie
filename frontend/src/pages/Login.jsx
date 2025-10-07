import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signInWithRedirect,signInWithPopup, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../firebase";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        { withCredentials: true } // include HttpOnly cookie
      );
      toast.success("Login successful!", { position: "top-right" });
      console.log(res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err.response?.data?.error || err.message);
      toast.error(
        err.response?.data?.error || "Login failed! Please check your credentials.",
        { position: "top-right" }
      );
    }
  };

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider); // 🔹 popup method
    const user = result.user;

    // Get Firebase ID token to send to backend
    const idToken = await user.getIdToken();

    // Send token to backend
    const res = await axios.post(
      "http://localhost:5000/api/auth/google-auth",
      { idToken },
      { withCredentials: true } // important for cookies
    );

    toast.success("Google login successful!");
    console.log("Backend response:", res.data);
    navigate("/profile");
  } catch (err) {
    console.error("Google login failed:", err);
    toast.error("Google login failed! Check console.");
  }
};

  // Handle Google redirect result after returning from Google login
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          const user = result.user;
          const idToken = await user.getIdToken(); // <-- get actual Firebase ID token
          console.log("Firebase ID Token:", idToken);

          const res = await axios.post(
            "http://localhost:5000/api/auth/google-auth",
            { idToken }, // <-- send ID token, not user data
            { withCredentials: true }
          );

          toast.success("Google login successful!", { position: "top-right" });
          console.log("Google Login Backend Response:", res.data);
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.error("Google Redirect Result Error:", err);
        toast.error("Google login failed! Please try again.", { position: "top-right" });
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
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
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
            aria-label="Login"
          >
            Login
          </button>
        </form>
        <div className="my-6 text-center text-gray-600">or</div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Login with Google"
        >
          <FcGoogle className="text-xl" /> Login with Google
        </button>
        <p className="text-center text-sm text-gray-700 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 hover:text-orange-600 font-medium underline"
            aria-label="Sign Up"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
