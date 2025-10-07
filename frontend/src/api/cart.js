// frontend/src/api/cart.js
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

export const getCartItems = async () => {
  const res = await fetch(`${BACKEND_URL}/api/cart`);
  if (!res.ok) throw new Error("Failed to fetch cart items");
  return await res.json();
};
