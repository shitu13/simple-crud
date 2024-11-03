import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser, getAllUsers } from '../services/service.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Fetch the user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getAllUsers();
        const existingUser = users.find((u) => u._id === id);
        if (existingUser) {
          setUser(existingUser);
        } else {
          toast.error('User not found');
        }
      } catch (error) {
        toast.error('Error fetching user data: ' + error.message);
      }
    };

    fetchUser();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  // Validate phone number for numeric characters
  const isPhoneNumberValid = (phone) => {
    return /^[0-9]*$/.test(phone);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPhoneNumberValid(user.phone)) {
      toast.error('Phone number must contain only numeric values (0-9)!');
      return;
    }

    try {
      await updateUser(id, user);
      toast.success('User updated successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Error updating user: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h2 style={styles.heading}>Edit User</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            readOnly
            style={{ ...styles.input, backgroundColor: '#f0f0f0', cursor: 'not-allowed' }} 
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={user.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Update User</button>
      </form>
    </div>
  );
};

// Styling object for inline styles
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  heading: {
    textAlign: 'center',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#333',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default EditUser;
