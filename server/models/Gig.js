const mongoose = require('mongoose');

const gigSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    budget: { type: Number, required: true, min: 1 },
    city: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Travel', 'Plumber', 'Walker', 'Delivery', 'Other']
    },
    status: {
      type: String,
      required: true,
      enum: ['Open', 'In Progress', 'Completed'],
      default: 'Open'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gig', gigSchema);
