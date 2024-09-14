
import { useContext, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Layout from './Layout'
import { AuthContext } from './context/authContext'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

function App() {
  const {setCurrentUser}=useContext(AuthContext)
  useEffect(()=>{
 
    async function getMe(){
     try{
       const res =   await axios.get(`http://localhost:8800/api/auth/me`,{
         withCredentials:true
       })
     
       setCurrentUser(res.data)
       console.log(res.data)
     }
     catch(e){
 console.log(e)
     }
    }
    getMe()
   },[])
  return (
    <>
      <Navbar />
      <Layout />
      <Toaster />
    </>
  )
}

export default App
