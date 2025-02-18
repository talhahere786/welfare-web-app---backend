import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// Import route files
import donorRoutes from './routes/donor.router.js';
import familyRoutes from './routes/family.router.js';
import fileRoutes from './routes/file.router.js';
import paymentRoutes from './routes/payment.router.js';
import predictionRoutes from './routes/prediction.router.js';
import userRoutes from './routes/user.router.js';
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (use in development)
app.use(cors());
app.use(express.json()); // allows us to accept JSON data in the req.body

// Use Routes
app.use('/api', donorRoutes);
app.use('/api', familyRoutes);
app.use('/api', fileRoutes);
app.use('/api', paymentRoutes);
app.use('/api', predictionRoutes);
app.use('/api', userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
