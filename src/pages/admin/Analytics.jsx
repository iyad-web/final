// src/pages/admin/Analytics.jsx
import React from "react";
import { Star } from "lucide-react";

const Analytics = ({ movies }) => {
  const topMovies = [...movies].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <div>
      <div className="card">
        <h3 className="card-title">Statistiques de Performance</h3>
        <div className="analytics-grid">
          <div className="analytics-card blue">
            <p>Taux de croissance</p>
            <p className="analytics-value">+24%</p>
            <p>vs mois dernier</p>
          </div>
          <div className="analytics-card green">
            <p>Nouveaux utilisateurs</p>
            <p className="analytics-value">342</p>
            <p>ce mois-ci</p>
          </div>
          <div className="analytics-card red">
            <p>Temps moyen</p>
            <p className="analytics-value">12 min</p>
            <p>par session</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Films les plus populaires</h3>
        <div>
          {topMovies.map((movie, index) => (
            <div key={movie.id} className="list-item">
              <div className="list-item-content">
                <div className="rank-number">{index + 1}</div>
                <div className="list-item-info">
                  <p>{movie.title}</p>
                  <p>{movie.views.toLocaleString()} vues</p>
                </div>
              </div>
              <div className="rating-display">
                <Star />
                <span>{movie.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
