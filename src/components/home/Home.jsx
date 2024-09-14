
import { useEffect, useState } from 'react'
import ClassCard from '../../cards/classcard/ClassCard'
import {Link} from 'react-router-dom'
import './home.css'
import axios from 'axios'

const Home = () => {
const [data,setData]=useState([])
  useEffect(()=>{
   const getData=async()=>{
    try {
      const res= await axios.get(`http://localhost:8800/api/class`)
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
   }
   getData()
  },[])

  return (
    <div className='homecon'>
<h1 className="homeh1">All clases</h1>
<div className='homecontainer'>
     
     {
      data ? data.map((item,idx)=>{
         return  <Link  key={idx} to={item._id} >
        <ClassCard 
         title={item?.title}
         description={item?.description}/>  </Link>
       }) : <h1>No class available</h1>
     }
   </div>
    </div>
   
  )
}

export default Home