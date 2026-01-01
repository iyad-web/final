// backend/controllers/movieController.js
import axios from "axios";
import Movie from "../models/Movie.js";

// @desc    Search movies from OMDb
// @route   GET /api/movies/search?query=...
// @access  Public
export const searchMovies = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter required" });
    }

    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: query,
      },
    });

    if (response.data.Response === "True") {
      res.json(response.data.Search);
    } else {
      res.status(404).json({ message: response.data.Error });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get movie details from OMDb
// @route   GET /api/movies/omdb/:imdbID
// @access  Public
export const getMovieFromOMDb = async (req, res) => {
  try {
    const { imdbID } = req.params;

    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: imdbID,
      },
    });

    if (response.data.Response === "True") {
      res.json(response.data);
    } else {
      res.status(404).json({ message: response.data.Error });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all movies from DB
// @route   GET /api/movies
// @access  Public
export const getMovies = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const query = status ? { status } : {};

    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("addedBy", "name email");

    const count = await Movie.countDocuments(query);

    res.json({
      movies,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate(
      "addedBy",
      "name email"
    );

    if (!movie) {
      return res.status(404).json({ message: "Film non trouvé" });
    }

    // Incrémenter les vues
    await movie.incrementViews();

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add movie to DB
// @route   POST /api/movies
// @access  Private/Admin
export const addMovie = async (req, res) => {
  try {
    const { imdbID } = req.body;

    // Vérifier si le film existe déjà
    const existingMovie = await Movie.findOne({ imdbID });

    if (existingMovie) {
      return res
        .status(400)
        .json({ message: "Ce film existe déjà dans la base de données" });
    }

    // Récupérer les détails depuis OMDb
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: imdbID,
      },
    });

    if (response.data.Response !== "True") {
      return res.status(404).json({ message: "Film non trouvé sur OMDb" });
    }

    const omdbData = response.data;

    // Créer le film
    const movie = await Movie.create({
      imdbID: omdbData.imdbID,
      title: omdbData.Title,
      year: omdbData.Year,
      genre: omdbData.Genre,
      director: omdbData.Director,
      actors: omdbData.Actors,
      plot: omdbData.Plot,
      poster: omdbData.Poster,
      imdbRating: omdbData.imdbRating,
      runtime: omdbData.Runtime,
      language: omdbData.Language,
      country: omdbData.Country,
      awards: omdbData.Awards,
      addedBy: req.user._id,
      status: req.body.status || "Publié",
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Film non trouvé" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Film non trouvé" });
    }

    await movie.deleteOne();

    res.json({ message: "Film supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get popular movies (most viewed)
// @route   GET /api/movies/popular
// @access  Public
export const getPopularMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ status: "Publié" })
      .sort({ views: -1 })
      .limit(10);

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
