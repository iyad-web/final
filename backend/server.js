// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";
import userRoutes from "./routes/users.js";
import reviewRoutes from "./routes/reviews.js";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "🎬 Bienvenue sur MovieFlix API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      movies: "/api/movies",
      users: "/api/users",
      reviews: "/api/reviews",
    },
  });
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
});
