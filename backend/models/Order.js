const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  items: [
    {
      dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    }
  ],
  status: {
    type: String,
    enum: ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'],
    default: 'Pending',
  },
  totalAmount: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
