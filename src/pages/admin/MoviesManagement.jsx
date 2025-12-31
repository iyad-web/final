// src/pages/admin/MoviesManagement.jsx
import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import DataTable from "../../components/admin/DataTable";

const MoviesManagement = ({ movies, onDelete, onEdit, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { key: "title", label: "Titre" },
    { key: "year", label: "Année" },
    { key: "genre", label: "Genre" },
    { key: "rating", label: "Note" },
    { key: "views", label: "Vues" },
    { key: "status", label: "Statut" },
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="table-controls">
        <div className="search-table">
          <Search />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un film..."
          />
        </div>
        <button className="add-button" onClick={() => onAdd && onAdd()}>
          <Plus />
          Ajouter un film
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredMovies}
        onDelete={onDelete}
        onEdit={onEdit}
        type="movies"
      />
    </div>
  );
};

export default MoviesManagement;
