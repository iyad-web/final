// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/common/Header";
import MovieGrid from "../components/movie/MovieGrid";
import MovieModal from "../components/movie/MovieModal";
import Loader from "../components/common/Loader";
import { searchMovies, getMovieDetails } from "../api/omdb";
import "../styles/home.css";

const HomePage = ({ user, onLogout }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    handleSearch("marvel");
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    const result = await searchMovies(query);

    if (result.success) {
      setMovies(result.data);
    } else {
      setError(result.error);
      setMovies([]);
    }

    setLoading(false);
  };

  const handleMovieClick = async (imdbID) => {
    setLoading(true);
    const result = await getMovieDetails(imdbID);

    if (result.success) {
      setSelectedMovie(result.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="home-page">
      <Header user={user} onLogout={onLogout} onSearch={handleSearch} />

      <main className="main-content">
        <div className="content-container">
          {error && <div className="error-message">{error}</div>}

          {loading && <Loader />}

          {!loading && movies.length > 0 && (
            <div className="movies-section">
              <h2 className="section-title">Films populaires</h2>
              <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
            </div>
          )}
        </div>
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
