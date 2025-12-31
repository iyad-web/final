import React from "react";
import "../styles/page404.css";

const Page404 = () => {
  return (
    <div className="page-404-container">
      <div className="page-404-card">
        <h1 className="page-404-code">404</h1>
        <h2 className="page-404-title">Page non trouvée</h2>
        <p className="page-404-desc">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="page-404-actions">
          <a className="btn" href="/">
            Retour à l'accueil
          </a>
          <button
            className="btn btn-secondary"
            onClick={() => window.history.back()}
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page404;
