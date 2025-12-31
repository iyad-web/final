// src/pages/admin/Settings.jsx
import React from "react";

const Settings = () => {
  return (
    <div className="card">
      <h3 className="card-title">Paramètres Généraux</h3>
      <div className="form-group">
        <label className="form-label">Nom du site</label>
        <input type="text" defaultValue="MovieFlix" className="form-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          defaultValue="La meilleure plateforme de streaming de films"
          rows={3}
          className="form-input"
          style={{ resize: "vertical" }}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Clé API OMDb</label>
        <input type="password" placeholder="66f2788c" className="form-input" />
      </div>
      <button className="add-button">Enregistrer les modifications</button>
    </div>
  );
};

export default Settings;
