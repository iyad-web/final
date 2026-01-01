import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addToFavorites,
  removeFromFavorites,
  getUserStats,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

router.get("/", protect, admin, getUsers);
router.get("/stats", protect, admin, getUserStats);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

router.post("/favorites/:movieId", protect, addToFavorites);
router.delete("/favorites/:movieId", protect, removeFromFavorites);

export default router;
