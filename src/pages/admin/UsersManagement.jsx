// src/pages/admin/UsersManagement.jsx
import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import DataTable from "../../components/admin/DataTable";

const UsersManagement = ({ users, onDelete, onEdit, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    { key: "name", label: "Nom" },
    { key: "email", label: "Email" },
    { key: "role", label: "Rôle" },
    { key: "joinDate", label: "Date d'inscription" },
    { key: "active", label: "Statut" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Rechercher un utilisateur..."
          />
        </div>
        <button className="add-button" onClick={() => onAdd && onAdd()}>
          <Plus />
          Ajouter un utilisateur
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        onDelete={onDelete}
        onEdit={onEdit}
        type="users"
      />
    </div>
  );
};

export default UsersManagement;
