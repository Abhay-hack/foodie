import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", // previously username
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast.success("Signup successful!");
      console.log(res.data);
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed!");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: user.displayName,
        email: user.email,
        password: user.uid, // optional placeholder
      });

      toast.success("Google signup successful!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Google signup failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
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
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Sign Up
        </button>
        <div className="my-4 text-center">or</div>
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <FcGoogle className="text-xl" /> Sign up with Google
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
