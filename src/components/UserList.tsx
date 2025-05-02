import React, { useState } from 'react';
import { User } from '../types/User';
import './UserList.css';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  searchTerm: string;
  onSearch: (term: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onEdit,
  onDelete,
  searchTerm,
  onSearch
}) => {
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value);

    if (value.length > 0) {
      const suggestions = users
        .filter(user => user.email.toLowerCase().includes(value.toLowerCase()))
        .map(user => user.email);
      setEmailSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setEmailSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Select email from suggestions
  const selectEmailSuggestion = (email: string) => {
    onSearch(email);
    setShowSuggestions(false);
  };

  // Handle delete confirmation
  const confirmDelete = (id: string, email: string) => {
    if (window.confirm(`Are you sure you want to delete user with email ${email}?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Manage Users - Klimb Assignment</h2>
        <div className="search-container">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={handleSearchChange}
              onBlur={() => {
                // Delay hiding suggestions to allow for clicks
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />
            {showSuggestions && emailSuggestions.length > 0 && (
              <div className="email-suggestions">
                {emailSuggestions.map((email, index) => {
                  const user = users.find(u => u.email === email);
                  return (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => selectEmailSuggestion(email)}
                    >
                      <span className="email">{email}</span>
                      {user && (
                        <span className="name">
                          {user.firstName} {user.lastName}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="no-users">
          <p>No users found. Add a new user to get started.</p>
        </div>
      ) : (
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Department</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>{user.department}</td>
                  <td>{user.location}</td>
                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => confirmDelete(user.id, user.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
