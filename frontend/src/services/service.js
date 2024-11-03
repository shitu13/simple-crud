/* eslint-disable no-useless-catch */
import axios from 'axios';

// Set base URL for axios
const api = axios.create({
  baseURL: "https://simple-crud-backend-qtvn.onrender.com"
});

// Function to add a new user
export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update a user by ID
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to delete a user
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// You can add other API functions here (e.g., getAllUsers, updateUser, deleteUser)
