// src/pages/admin/AdminPage.jsx
import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Dashboard from "./Dashboard";
import MoviesManagement from "./MoviesManagement";
import UsersManagement from "./UsersManagement";
import Analytics from "./Analytics";
import Settings from "./Settings";
import "../../styles/admin.css";

const AdminPage = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Données simulées
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      year: 2010,
      genre: "Sci-Fi",
      rating: 8.8,
      views: 15420,
      status: "Publié",
    },
    {
      id: 2,
      title: "The Dark Knight",
      year: 2008,
      genre: "Action",
      rating: 9.0,
      views: 23150,
      status: "Publié",
    },
    {
      id: 3,
      title: "Interstellar",
      year: 2014,
      genre: "Sci-Fi",
      rating: 8.6,
      views: 18930,
      status: "Publié",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      year: 1994,
      genre: "Crime",
      rating: 8.9,
      views: 20100,
      status: "Brouillon",
    },
    {
      id: 5,
      title: "The Matrix",
      year: 1999,
      genre: "Sci-Fi",
      rating: 8.7,
      views: 19500,
      status: "Publié",
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean@email.com",
      role: "Utilisateur",
      joinDate: "2024-01-15",
      active: true,
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie@email.com",
      role: "Admin",
      joinDate: "2024-02-20",
      active: true,
    },
    {
      id: 3,
      name: "Pierre Durand",
      email: "pierre@email.com",
      role: "Utilisateur",
      joinDate: "2024-03-10",
      active: false,
    },
  ]);

  const stats = {
    totalMovies: 156,
    totalUsers: 1247,
    totalViews: 45820,
    avgRating: 8.2,
  };

  const deleteMovie = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
      setMovies(movies.filter((m) => m.id !== id));
    }
  };

  // Ajouter un film (prompt simple)
  const addMovie = () => {
    const title = window.prompt("Titre du film :");
    if (!title) return;
    const year = parseInt(window.prompt("Année :", "2024"), 10) || 0;
    const genre = window.prompt("Genre :", "Drama");
    const rating = parseFloat(window.prompt("Note :", "0")) || 0;
    const views = parseInt(window.prompt("Vues :", "0"), 10) || 0;
    const status = window.prompt("Statut (Publié/Brouillon) :", "Publié");
    const newId = movies.length ? Math.max(...movies.map((m) => m.id)) + 1 : 1;
    const newMovie = {
      id: newId,
      title,
      year,
      genre: genre || "Autre",
      rating,
      views,
      status: status || "Publié",
    };
    setMovies([...movies, newMovie]);
  };

  // Modifier un film (prompt pré-rempli)
  const editMovie = (id) => {
    const movie = movies.find((m) => m.id === id);
    if (!movie) return;
    const title = window.prompt("Titre :", movie.title) || movie.title;
    const year =
      parseInt(window.prompt("Année :", movie.year), 10) || movie.year;
    const genre = window.prompt("Genre :", movie.genre) || movie.genre;
    const rating =
      parseFloat(window.prompt("Note :", movie.rating)) || movie.rating;
    const views =
      parseInt(window.prompt("Vues :", movie.views), 10) || movie.views;
    const status =
      window.prompt("Statut (Publié/Brouillon) :", movie.status) ||
      movie.status;
    const updated = { ...movie, title, year, genre, rating, views, status };
    setMovies(movies.map((m) => (m.id === id ? updated : m)));
  };

  const deleteUser = (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Ajouter un utilisateur (prompt simple)
  const addUser = () => {
    const name = window.prompt("Nom de l'utilisateur :");
    if (!name) return;
    const email = window.prompt("Email :");
    if (!email) return;
    const role = window.prompt("Rôle (Admin/Utilisateur) :", "Utilisateur");
    const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    const newUser = {
      id: newId,
      name,
      email,
      role: role || "Utilisateur",
      joinDate: new Date().toISOString().slice(0, 10),
      active: true,
    };
    setUsers([...users, newUser]);
  };

  // Modifier un utilisateur (prompt pré-rempli)
  const editUser = (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const name = window.prompt("Nom :", user.name) || user.name;
    const email = window.prompt("Email :", user.email) || user.email;
    const role = window.prompt("Rôle :", user.role) || user.role;
    const activeAnswer = window.prompt(
      "Actif ? (oui/non) :",
      user.active ? "oui" : "non"
    );
    const active = activeAnswer
      ? activeAnswer.toLowerCase().startsWith("o")
      : user.active;
    const updated = { ...user, name, email, role, active };
    setUsers(users.map((u) => (u.id === id ? updated : u)));
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard";
      case "movies":
        return "Gestion des Films";
      case "users":
        return "Gestion des Utilisateurs";
      case "analytics":
        return "Analytics";
      case "settings":
        return "Paramètres";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="admin-container">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-content">
            <h2 className="admin-title">{getPageTitle()}</h2>
            <div className="admin-badge">{user?.name || "Admin"}</div>
          </div>
        </header>

        <div className="admin-content">
          {activeTab === "dashboard" && (
            <Dashboard stats={stats} recentMovies={movies.slice(0, 4)} />
          )}

          {activeTab === "movies" && (
            <MoviesManagement
              movies={movies}
              onDelete={deleteMovie}
              onEdit={editMovie}
              onAdd={addMovie}
            />
          )}

          {activeTab === "users" && (
            <UsersManagement
              users={users}
              onDelete={deleteUser}
              onEdit={editUser}
              onAdd={addUser}
            />
          )}

          {activeTab === "analytics" && <Analytics movies={movies} />}

          {activeTab === "settings" && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
