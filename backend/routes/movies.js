import express from "express";
import {
  searchMovies,
  getMovieFromOMDb,
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  getPopularMovies,
} from "../controllers/movieController.js";
import { protect } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

const router = express.Router();

router.get("/search", searchMovies);
router.get("/omdb/:imdbID", getMovieFromOMDb);
router.get("/popular", getPopularMovies);
router.get("/", getMovies);
router.get("/:id", getMovie);

router.post("/", protect, admin, addMovie);
router.put("/:id", protect, admin, updateMovie);
router.delete("/:id", protect, admin, deleteMovie);

export default router;
