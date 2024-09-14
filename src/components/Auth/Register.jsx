
import  { useContext, useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import './auth.css'
import { AuthContext } from '../../context/authContext';
const Register = () => {
  const {currentUser}=useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'student', 
  });
  const nav= useNavigate()
  const [err, setErr] = useState('');
  if(currentUser)
    nav("/")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
       console.log("SAd")
       try {
        const err =    await axios.post(`http://localhost:8800/api/auth/register`, formData  )
        setErr(err?.response?.message);
        nav("/login")
      } catch (err) {
        setErr(err?.message);
      }
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      {err}
      <button type="submit" className="submit-btn">Register</button>
    </form>
  );
};

export default Register;
