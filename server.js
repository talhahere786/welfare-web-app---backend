import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/user.router.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (use in development)
app.use(cors());
app.use(express.json()); // allows us to accept JSON data in the req.body

// Routes
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});