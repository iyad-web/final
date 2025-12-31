// src/pages/admin/Dashboard.jsx
import React from "react";
import { Film, Users, Eye, Star } from "lucide-react";
import StatsCard from "../../components/admin/StatsCard";

const Dashboard = ({ stats, recentMovies }) => {
  return (
    <div>
      <div className="stats-grid">
        <StatsCard
          title="Total Films"
          value={stats.totalMovies}
          icon={Film}
          color="blue"
        />
        <StatsCard
          title="Utilisateurs"
          value={stats.totalUsers}
          icon={Users}
          color="green"
        />
        <StatsCard
          title="Vues Totales"
          value={stats.totalViews.toLocaleString()}
          icon={Eye}
          color="red"
        />
        <StatsCard
          title="Note Moyenne"
          value={`${stats.avgRating}/10`}
          icon={Star}
          color="yellow"
        />
      </div>

      <div className="card">
        <h3 className="card-title">Films Récents</h3>
        <div>
          {recentMovies.map((movie) => (
            <div key={movie.id} className="list-item">
              <div className="list-item-content">
                <div className="list-item-icon">
                  <Film />
                </div>
                <div className="list-item-info">
                  <p>{movie.title}</p>
                  <p>
                    {movie.genre} • {movie.year}
                  </p>
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

export default Dashboard;
