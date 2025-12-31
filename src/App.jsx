// src/App.jsx
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import Profil from "./pages/Profil";
import Page404 from "./pages/Page404";
import Footer from "./components/common/Footer";
import useAuth from "./hooks/useAuth";
import "./styles/global.css";

function App() {
  const { user, loading, login, logout } = useAuth();
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleLogin = (userData) => {
    login(userData);

    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentRoute(path);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#141414",
        }}
      >
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentRoute.startsWith("/admin")) {
    if (user.role !== "admin") {
      // Afficher la page 404 si l'utilisateur n'a pas les droits admin
      return (
        <>
          <Page404 />
          <Footer user={user} />
        </>
      );
    }
    return (
      <>
        <AdminPage user={user} onLogout={handleLogout} />
        <Footer user={user} />
      </>
    );
  }

  // Route racine -> Home
  if (currentRoute === "/" || currentRoute === "") {
    return (
      <>
        <HomePage user={user} onLogout={handleLogout} />
        <Footer user={user} />
      </>
    );
  }

  // Profil
  if (currentRoute === "/profil") {
    return (
      <>
        <Profil user={user} />
        <Footer user={user} />
      </>
    );
  }

  // Pour toutes les autres routes inconnues, afficher la 404
  return (
    <>
      <Page404 />
      <Footer user={user} />
    </>
  );
}

export default App;
