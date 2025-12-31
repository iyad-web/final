import React from "react";
import { Edit, Trash2, Star } from "lucide-react";

const DataTable = ({ columns, data, onEdit, onDelete, type }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.key === "rating" ? (
                    <div className="rating-display">
                      <Star />
                      <span>{row[col.key]}</span>
                    </div>
                  ) : col.key === "status" ||
                    col.key === "role" ||
                    col.key === "active" ? (
                    <span
                      className={`status-badge ${getStatusClass(
                        row[col.key],
                        col.key
                      )}`}
                    >
                      {formatStatus(row[col.key])}
                    </span>
                  ) : col.key === "views" ? (
                    row[col.key].toLocaleString()
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
              <td>
                <div className="action-buttons">
                  <button
                    className="action-button edit"
                    onClick={() => onEdit && onEdit(row.id)}
                  >
                    <Edit />
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => onDelete && onDelete(row.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getStatusClass = (value, key) => {
  if (key === "status") {
    return value === "Publié" ? "published" : "draft";
  }
  if (key === "role") {
    return value === "Admin" ? "admin" : "user";
  }
  if (key === "active") {
    return value ? "active" : "inactive";
  }
  return "";
};

const formatStatus = (value) => {
  if (typeof value === "boolean") {
    return value ? "Actif" : "Inactif";
  }
  return value;
};

export default DataTable;
