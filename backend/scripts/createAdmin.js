import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";
import connectDB from "../config/db.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    // Vérifier si l'admin existe déjà
    const existingAdmin = await User.findOne({ email: "admin@movieflix.com" });

    if (existingAdmin) {
      console.log("⚠️  Admin existe déjà");
      process.exit(0);
    }

    // Créer l'admin
    const admin = await User.create({
      name: "Admin User",
      email: "admin@movieflix.com",
      password: "admin123",
      role: "admin",
    });

    console.log("✅ Admin créé avec succès");
    console.log("📧 Email: admin@movieflix.com");
    console.log("🔑 Password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur:", error);
    process.exit(1);
  }
};

createAdmin();
