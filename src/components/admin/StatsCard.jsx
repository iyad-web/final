import React from "react";

const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-content">
        <div className="stat-info">
          <p>{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        <Icon className={`stat-icon ${color}`} />
      </div>
    </div>
  );
};

export default StatsCard;
