// src/components/common/Header.jsx
import React, { useState, useEffect } from "react";
import { Film, Search, User, LogOut, Shield } from "lucide-react";

const Header = ({ user, onLogout, onSearch, onReanalyze }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const goToAdmin = () => {
    window.history.pushState({}, "", "/admin");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const goToProfile = () => {
    window.history.pushState({}, "", "/profil");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleLogoClick = () => {
    if (typeof onReanalyze === "function") {
      onReanalyze();
      return;
    }
    // fallback : reload the page to trigger a full re-analysis
    window.location.reload();
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="header-content">
          <div
            className="logo"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => (e.key === "Enter" ? handleLogoClick() : null)}
            style={{ cursor: "pointer" }}
            title="Re-lancer l'analyse"
          >
            <Film />
            <h1>IYEDFLIX</h1>
          </div>

          <div className="search-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Rechercher un film..."
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
              <Search />
            </button>
          </div>

          {user && (
            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-role">
                    {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                  </div>
                </div>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" onClick={goToProfile}>
                    <User />
                    Mon profil
                  </button>

                  {user.role === "admin" && (
                    <button
                      className="dropdown-item admin-link"
                      onClick={goToAdmin}
                    >
                      <Shield />
                      Panneau Admin
                    </button>
                  )}

                  <button className="dropdown-item logout" onClick={onLogout}>
                    <LogOut />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
