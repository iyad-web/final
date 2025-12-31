// src/components/movie/MovieCard.jsx
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

const MovieCard = ({ movie, onClick }) => {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("profile_favorites") || "[]"
      );
      setIsFav(saved.some((f) => f.id === movie.imdbID));
    } catch (e) {
      setIsFav(false);
    }
  }, [movie.imdbID]);

  const toggleFav = (e) => {
    e.stopPropagation();
    try {
      const raw = localStorage.getItem("profile_favorites") || "[]";
      const list = JSON.parse(raw);
      const exists = list.some((f) => f.id === movie.imdbID);
      let updated;
      if (exists) {
        updated = list.filter((f) => f.id !== movie.imdbID);
      } else {
        updated = [...list, { id: movie.imdbID, title: movie.Title }];
      }
      localStorage.setItem("profile_favorites", JSON.stringify(updated));
      setIsFav(!exists);
      // dispatch event so other components can react if needed
      window.dispatchEvent(
        new CustomEvent("favorites:changed", { detail: updated })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="movie-card" onClick={() => onClick(movie.imdbID)}>
      <div className="movie-poster-container">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.Title}
          className="movie-poster"
        />
        <button
          className={`fav-button ${isFav ? "fav-active" : ""}`}
          onClick={toggleFav}
          title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={isFav}
        >
          <Star />
        </button>
        <div className="movie-overlay">
          <h3 className="movie-title">{movie.Title}</h3>
          <p className="movie-year">{movie.Year}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
