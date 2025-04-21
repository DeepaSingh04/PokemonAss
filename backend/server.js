// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import pokemonRoutes from './routes/pokemonRoutes.js';


// dotenv.config();
// const app = express();
// app.use(cors())
// app.use(express.json());

// connectDB();

// app.use('/api/pokemon', pokemonRoutes);

// const PORT = process.env.PORT||2475;
// app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";

dotenv.config();
const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend default port
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/pokemon", pokemonRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
