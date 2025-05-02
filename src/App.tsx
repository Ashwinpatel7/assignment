import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { User, UserFormData } from './types/User';
import './App.css';

const App: React.FC = () => {
  // Load users from localStorage or start with empty array
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Update filtered users when users or searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      setFilteredUsers(
        users.filter(user =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [users, searchTerm]);

  // Add a new user
  const handleAddUser = (values: UserFormData) => {
    const newUser = { ...values, id: uuidv4() };
    setUsers([...users, newUser]);
  };

  // Update an existing user
  const handleEditUser = (values: User | UserFormData) => {
    if ('id' in values) {
      setUsers(users.map(user => user.id === values.id ? values as User : user));
    }
    setEditingUser(null);
  };

  // Delete a user
  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  // Get emails of all users except the one being edited
  const getExistingEmails = () => {
    if (editingUser) {
      return users.filter(user => user.id !== editingUser.id).map(u => u.email);
    }
    return users.map(u => u.email);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>User Management System</h1>
      </header>

      <main className="app-main">
        <div className="app-content">
          <div className="form-container">
            {editingUser ? (
              <UserForm
                initialValues={editingUser}
                onSubmit={handleEditUser}
                existingEmails={getExistingEmails()}
                isEdit={true}
                onCancel={handleCancelEdit}
              />
            ) : (
              <UserForm
                onSubmit={handleAddUser}
                existingEmails={getExistingEmails()}
              />
            )}
          </div>

          <UserList
            users={filteredUsers}
            onEdit={setEditingUser}
            onDelete={handleDelete}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} User Management System</p>
      </footer>
    </div>
  );
};

export default App;