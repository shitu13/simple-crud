import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/service.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        toast.error('Error fetching users: ' + error.message);
      }
    };
    fetchUsers();
  }, []);

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
      toast.success('User deleted successfully!');
    } catch (error) {
      toast.error('Error deleting user: ' + error.message);
    }
  };

  // Handle edit user
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User List</h2>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      {users.length > 0 ? (
        <ul style={styles.list}>
          {users.map(user => (
            <li key={user._id} style={styles.listItem}>
              <p style={styles.text}><strong>Name:</strong> {user.name}</p>
              <p style={styles.text}><strong>Email:</strong> {user.email}</p>
              <p style={styles.text}><strong>Phone:</strong> {user.phone}</p>
              <p style={styles.text}><strong>Address:</strong> {user.address}</p>
              <div style={styles.buttonContainer}>
                <button onClick={() => handleEdit(user._id)} style={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noUsers}>No users found.</p>
      )}
    </div>
  );
};

// Inline styling object with improved color contrast
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '1rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  text: {
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  editButton: {
    padding: '8px 12px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  deleteButton: {
    padding: '8px 12px',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  noUsers: {
    textAlign: 'center',
    color: '#888',
  },
};

export default UserList;
