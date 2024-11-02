import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addUser } from '../services/service.js';

const AddUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      // Use addUser from the service to send a POST request
      await addUser(user);
      setMessage('User added successfully!');
      setUser({
        name: '',
        email: '',
        phone: '',
        address: ''
      });

      navigate('/');
    } catch (error) {
      setMessage('Error adding user: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Add New User</h2>
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
