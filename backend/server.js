// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');


dotenv.config();
connectDB(); // 🔌 Connect MongoDB

const app = express();

const allowedOrigins = [
  'http://localhost:5173', // Your local frontend development server
  'https://quickserve-frontend.vercel.app', // REPLACE WITH YOUR ACTUAL VERCELL FRONTEND URL
  // OR if deployed on Render: 'https://quickserve-frontend.onrender.com', // REPLACE WITH YOUR ACTUAL RENDER FRONTEND URL
  // Add more origins if you have them, e.g., 'https://www.yourdomain.com'
];

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // or if the origin is in our allowed list.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This is important for sending/receiving cookies (like JWT)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Explicitly allow methods your API uses
  optionsSuccessStatus: 204 // For preflight requests
}));

// ADD THESE TWO LINES TO PARSE REQUEST BODIES
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded requests


// Routes
app.get('/', (req, res) => {
  res.send('🍽️ QuickServe API is running...');
});
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/dishes', require('./routes/dishRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
// Error handlers
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});