import React from "react";
import {
  LayoutDashboard,
  Film,
  Users,
  TrendingUp,
  Settings,
  Home,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  activeTab,
  setActiveTab,
  onLogout,
}) => {
  const goToHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        {isOpen && <h1 className="sidebar-title">MOVIEFLIX</h1>}
        <button onClick={toggleSidebar} className="toggle-button">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <button onClick={goToHome} className="nav-button">
          <Home />
          {isOpen && <span>Accueil Public</span>}
        </button>

        <button
          onClick={() => setActiveTab("dashboard")}
          className={`nav-button ${activeTab === "dashboard" ? "active" : ""}`}
        >
          <LayoutDashboard />
          {isOpen && <span>Dashboard</span>}
        </button>

        <button
          onClick={() => setActiveTab("movies")}
          className={`nav-button ${activeTab === "movies" ? "active" : ""}`}
        >
          <Film />
          {isOpen && <span>Films</span>}
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`nav-button ${activeTab === "users" ? "active" : ""}`}
        >
          <Users />
          {isOpen && <span>Utilisateurs</span>}
        </button>

        <button
          onClick={() => setActiveTab("analytics")}
          className={`nav-button ${activeTab === "analytics" ? "active" : ""}`}
        >
          <TrendingUp />
          {isOpen && <span>Analytics</span>}
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`nav-button ${activeTab === "settings" ? "active" : ""}`}
        >
          <Settings />
          {isOpen && <span>Paramètres</span>}
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-button" onClick={onLogout}>
          <LogOut />
          {isOpen && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
