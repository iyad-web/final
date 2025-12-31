import React from "react";
import "../../styles/footer.css";

const Footer = ({ user }) => {
  const navigate = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo" onClick={() => navigate("/")}>
            IYEDFLIX
          </div>
          <p className="footer-copy">
            © {new Date().getFullYear()} IYEDFLIX. Tous droits réservés.
          </p>
        </div>

        <div className="footer-links">
          <button className="footer-link" onClick={() => navigate("/")}>
            Accueil
          </button>
          <button className="footer-link" onClick={() => navigate("/profil")}>
            Mon profil
          </button>
          {user && user.role === "admin" && (
            <button className="footer-link" onClick={() => navigate("/admin")}>
              Admin
            </button>
          )}
          <a className="footer-link" href="mailto:contact@iyedflix.example">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
