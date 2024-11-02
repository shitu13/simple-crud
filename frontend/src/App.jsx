import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './components/AddUser'
import UserList from './components/UserList'
import EditUser from './components/EditUser';
import Navbar from './components/Navbar';
import './App.css'
function App() {

  return (
    <Router>
      <Navbar /> {/* Navbar will be shown on every page */}
      <div>
        <h1>User Management App</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
