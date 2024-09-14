
import { useContext, useState } from 'react';
import './auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const {setCurrentUser,currentUser}=useContext(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState('');
  const nav= useNavigate()
  if(currentUser)
    nav("/")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const user= await axios.post(`http://localhost:8800/api/auth/login`, formData ,{
       withCredentials:true
      } );
      setCurrentUser(user.data.user)
       nav("/")
     }
     catch(err){
      setErr(err);
     }
  
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <div className='cluster'>
      <button type="submit" className="submit-btn">Login</button>
      <button type="submit" className="submit-btn" onClick={()=>{
        setFormData({
          email: 'udityakumar2000@gmail.com',
          password: '12345678',
        })
      }}>Login as Admin</button>
      <button onClick={()=>{
        setFormData({
          email: 'uditya951@gmail.com',
          password: '12345678',
        })
      }} type="submit" className="submit-btn">Login as Student</button>
      </div>
      
    </form>
  );
};

export default Login;
