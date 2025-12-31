// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Film, Lock, Mail, LogIn, AlertCircle } from "lucide-react";
import "../styles/login.css";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@movieflix.com" && password === "admin123") {
        onLogin({ email, role: "admin", name: "Admin User" });
      } else if (email === "user@movieflix.com" && password === "user123") {
        onLogin({ email, role: "user", name: "User Normal" });
      } else {
        setError("Email ou mot de passe incorrect");
        setLoading(false);
      }
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <Film />
            </div>
            <h1>IYEDFLIX</h1>
            <p>Connectez-vous pour continuer</p>
          </div>

          {error && (
            <div className="login-error">
              <AlertCircle />
              <span>{error}</span>
            </div>
          )}

          <div className="login-form">
            <div className="form-group">
              <label className="form-label">
                <Mail />
                <span>Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="votre@email.com"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Lock />
                <span>Mot de passe</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="••••••••"
                className="form-input"
                required
              />
            </div>

            <button
              onClick={handleSubmit}
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-small"></div>
              ) : (
                <>
                  <LogIn />
                  <span>Se connecter</span>
                </>
              )}
            </button>
          </div>

          <div className="login-footer">
            <div className="demo-credentials">
              <p className="demo-title">Comptes de test :</p>
              <div className="demo-item">
                <strong>Admin :</strong> admin@movieflix.com / admin123
              </div>
              <div className="demo-item">
                <strong>User :</strong> user@movieflix.com / user123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
