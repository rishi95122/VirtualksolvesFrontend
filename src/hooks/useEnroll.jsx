import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useEnroll = (id) => {
  const nav=useNavigate()
    const {currentUser}=useContext(AuthContext)
  const handleEnrollClass=async()=>{
        try {
          await axios.post(`http://localhost:8800/api/class/enroll/${id}`,{
            user:currentUser
          })
          toast.success("enrolled")
          nav(0)
        } catch (error) {
          console.log(error)
        }
       }
  return handleEnrollClass
}

export default useEnroll