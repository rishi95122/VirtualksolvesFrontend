import React, { useContext, useEffect, useState } from 'react'
import './singleclass.css'
import axios from 'axios'
import { arr } from '../../data/imgArray'
import { useParams } from 'react-router-dom'
import ClassContent from './ClassContent'
import { AuthContext } from '../../context/authContext'
import toast from 'react-hot-toast'
import useEnroll from '../../hooks/useEnroll'


const SingleClass = () => {
  const [classData,setClassData]=useState()
const {currentUser}=useContext(AuthContext)

const {id}=useParams()
const handleEnrollClass =useEnroll(id)
const idx=Math.floor(Math.random() * arr.length)
const enroll= currentUser?.enrolledClasses?.includes(id)
const getData=async()=>{
  try {
    const res= await axios.get(`http://localhost:8800/api/class/${id}`)
  setClassData(res.data)
  } catch (error) {
    console.log(error)
  }
  }

  useEffect(()=>{
getData()
  },[])

  return (
    <div className="singlecard">
        <img src={arr[idx]} alt={'title'} className="singlecardimage" />
        <div className="singlecardcontent">
          <div className='enrollcon'>
          <h3 className="singlecardtitle">{classData?.title}</h3>
          <button onClick={()=>handleEnrollClass()} className='submitchapterbtn'>{enroll?"Enrolled":"Enroll class"}</button>
          </div>
        
          <p className="singlecarddescription">{classData?.description}</p>
        </div>
   

     <ClassContent enroll={enroll}  id={id} />
    
    
      </div>
  )
}

export default SingleClass