require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Gig = require('./models/Gig');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017/gigmobi';

app.use(cors());
app.use(express.json());

const toGigDto = (gigDoc) => ({
  id: gigDoc._id.toString(),
  title: gigDoc.title,
  description: gigDoc.description,
  budget: gigDoc.budget,
  city: gigDoc.city,
  category: gigDoc.category,
  status: gigDoc.status
});

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/gigs', async (_req, res) => {
  const gigs = await Gig.find().sort({ createdAt: -1 });
  res.json(gigs.map(toGigDto));
});

app.post('/api/gigs', async (req, res) => {
  const { title, description, budget, city, category } = req.body;

  if (!title || !description || !budget || !city || !category) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const gig = await Gig.create({
    title,
    description,
    budget,
    city,
    category,
    status: 'Open'
  });

  return res.status(201).json(toGigDto(gig));
});

app.patch('/api/gigs/:id/take', async (req, res) => {
  const gig = await Gig.findByIdAndUpdate(
    req.params.id,
    { status: 'In Progress' },
    { new: true }
  );

  if (!gig) {
    return res.status(404).json({ message: 'Gig not found.' });
  }

  return res.json(toGigDto(gig));
});

app.use((error, _req, res, _next) => {
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Internal server error.' });
});

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected at ${MONGODB_URI}`);

    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

start();
