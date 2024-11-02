import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser, getAllUsers } from '../services/service.js';

const EditUser = () => {
  const { id } = useParams(); // Get the user ID from URL
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState('');

  // Fetch the user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getAllUsers();
        const existingUser = users.find((u) => u._id === id);
        if (existingUser) {
          setUser(existingUser);
        } else {
          setMessage('User not found');
        }
      } catch (error) {
        setMessage('Error fetching user data: ' + error.message);
      }
    };

    fetchUser();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, user); // Call updateUser from service
      setMessage('User updated successfully!');
      navigate('/'); // Redirect to user list after updating
    } catch (error) {
      setMessage('Error updating user: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
