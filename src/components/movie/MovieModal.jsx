// src/components/movie/MovieModal.jsx
import React from "react";
import { X, Star, Calendar, Clock } from "lucide-react";

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-inner">
          <button onClick={onClose} className="close-button">
            <X />
          </button>

          <div className="modal-body">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.Title}
              className="modal-poster"
            />

            <div className="modal-details">
              <h2 className="modal-title">{movie.Title}</h2>

              <div className="movie-badges">
                {movie.imdbRating !== "N/A" && (
                  <div className="badge badge-rating">
                    <Star />
                    <span>{movie.imdbRating}/10</span>
                  </div>
                )}

                <div className="badge badge-year">
                  <Calendar />
                  <span>{movie.Year}</span>
                </div>

                {movie.Runtime !== "N/A" && (
                  <div className="badge badge-runtime">
                    <Clock />
                    <span>{movie.Runtime}</span>
                  </div>
                )}
              </div>

              {movie.Plot && movie.Plot !== "N/A" && (
                <div className="detail-section">
                  <h3 className="detail-title">Synopsis</h3>
                  <p className="detail-text">{movie.Plot}</p>
                </div>
              )}

              {movie.Genre && movie.Genre !== "N/A" && (
                <div className="detail-section">
                  <h3 className="detail-title">Genre</h3>
                  <p className="detail-text">{movie.Genre}</p>
                </div>
              )}

              {movie.Director && movie.Director !== "N/A" && (
                <div className="detail-section">
                  <h3 className="detail-title">Réalisateur</h3>
                  <p className="detail-text">{movie.Director}</p>
                </div>
              )}

              {movie.Actors && movie.Actors !== "N/A" && (
                <div className="detail-section">
                  <h3 className="detail-title">Acteurs</h3>
                  <p className="detail-text">{movie.Actors}</p>
                </div>
              )}

              {movie.Awards && movie.Awards !== "N/A" && (
                <div className="detail-section">
                  <h3 className="detail-title">Récompenses</h3>
                  <p className="detail-text">{movie.Awards}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
