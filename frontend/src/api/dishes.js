import axios from './axiosInstance';

export const getAllDishes = async () => {
  try {
    const res = await axios.get('/api/dishes'); // 🔥 Correct usage
    return res.data;
  } catch (err) {
    console.error('Error fetching dishes:', err);
    throw err;
  }
};

export const getDishById = async (id) => {
  try {
    const res = await axios.get(`/api/dishes/${id}`); // 🔥 Also correct
    return res.data;
  } catch (err) {
    console.error('Error fetching dish:', err);
    throw err;
  }
};
