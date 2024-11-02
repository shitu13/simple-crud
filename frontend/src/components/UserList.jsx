import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/service.js';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        setMessage('Error fetching users: ' + error.message);
      }
    };
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
      setMessage('User deleted successfully!');
    } catch (error) {
      setMessage('Error deleting user: ' + error.message);
    }
  };

  // Handle edit user
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div>
      <h2>User List</h2>
      {message && <p>{message}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id} style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px solid #ccc' }}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <button onClick={() => handleEdit(user._id)} style={{ marginRight: '0.5rem' }}>Edit</button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
