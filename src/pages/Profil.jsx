import React, { useEffect, useState } from "react";
import "../styles/profil.css";

const Profil = ({ user: initialUser }) => {
  const [name, setName] = useState(initialUser?.name || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [favorites, setFavorites] = useState([]);
  const [newFav, setNewFav] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("profile_favorites");
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {
      setFavorites([]);
    }

    // keep favorites in sync when changed elsewhere
    const handler = (e) => {
      try {
        setFavorites(
          e?.detail ||
            JSON.parse(localStorage.getItem("profile_favorites") || "[]")
        );
      } catch (err) {
        setFavorites([]);
      }
    };
    window.addEventListener("favorites:changed", handler);
    return () => window.removeEventListener("favorites:changed", handler);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("profile_favorites", JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const handleSave = () => {
    // Placeholder: here you'd normally call an API to save the profile
    try {
      const profile = { name, email };
      localStorage.setItem("profile_data", JSON.stringify(profile));
    } catch (e) {}
    alert("Profil enregistré");
    // navigate to home (SPA)
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleAddFavorite = () => {
    const title = newFav.trim();
    if (!title) return;
    const id = Date.now();
    const updated = [...favorites, { id, title }];
    setFavorites(updated);
    setNewFav("");
    try {
      localStorage.setItem("profile_favorites", JSON.stringify(updated));
      window.dispatchEvent(
        new CustomEvent("favorites:changed", { detail: updated })
      );
    } catch (e) {}
  };

  const handleRemoveFavorite = (id) => {
    if (!window.confirm("Supprimer ce favori ?")) return;
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  return (
    <div className="profil-container">
      <div className="profil-card">
        <h2>Mon Profil</h2>

        <div className="form-row">
          <label>Nom</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-actions">
          <button className="btn" onClick={handleSave}>
            Enregistrer
          </button>
        </div>

        <h3>Films favoris</h3>
        <div className="fav-input">
          <input
            placeholder="Titre du film"
            value={newFav}
            onChange={(e) => setNewFav(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddFavorite()}
          />
          <button className="btn" onClick={handleAddFavorite}>
            Ajouter
          </button>
        </div>

        <ul className="fav-list">
          {favorites.length === 0 && <li className="muted">Aucun favori</li>}
          {favorites.map((f) => (
            <li key={f.id}>
              <span>{f.title}</span>
              <button
                className="btn btn-small"
                onClick={() => handleRemoveFavorite(f.id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profil;
