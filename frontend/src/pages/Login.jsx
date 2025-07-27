// frontend/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase"; // Assuming firebase.js correctly exports auth and provider

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
          withCredentials: true,
        });
      toast.success("Login successful!");
      console.log(res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err.response?.data?.error || err.message);
      toast.error(err.response?.data?.error || "Login failed! Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // user is the Firebase User object
      const user = result.user;

      // Get the Firebase ID token
      const idToken = await user.getIdToken();

      // Send the ID token to your backend for verification
      const res = await axios.post("http://localhost:5000/api/auth/google-auth", {
        idToken: idToken, // <--- Send the Firebase ID Token
      });
      toast.success("Google login successful!");
      console.log("Google Login Backend Response:", res.data);
      navigate("/profile");
    } catch (err) {
      console.error("Google Login Error:", err.code, err.message, err.response?.data?.error);
      toast.error(err.response?.data?.error || "Google login failed! Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
        <div className="my-4 text-center">or</div>
        <button type="button" onClick={handleGoogleLogin} className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100">
          <FcGoogle className="text-xl" /> Login with Google
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500 underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;