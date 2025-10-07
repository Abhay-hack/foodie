// backend/server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

// Connect MongoDB
connectDB();

const app = express();

// Allowed origins (direct values, no .env)
const allowedOrigins = [
  "http://localhost:5173",
  "https://foodie-five-dun.vercel.app"
];

// Middleware
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, server-to-server, mobile apps
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // allow request
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Preflight (OPTIONS) requests
// // Preflight (OPTIONS) requests
app.options(/.*/, cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
}));


// Routes
app.get('/', (req, res) => {
  res.send('QuickServe API is running...');
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
  console.log(`Server running on port ${PORT}`);
});
