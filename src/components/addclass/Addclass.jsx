
import  { useContext, useState } from 'react';
import './addclass.css'; 
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
const Addclass = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const nav=useNavigate()
const {currentUser}=useContext(AuthContext)
console.log(currentUser)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
       await axios.post(`http://localhost:8800/api/class`,{
        title:formData.title,
        description:formData.description,
        admin:currentUser._id
      })
      toast.success("Class Added")
      nav("/")
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Class</h2>
      <div className="form-group">
        <label htmlFor="title">Title of class</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
    
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default Addclass;
