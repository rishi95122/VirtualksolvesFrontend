import axios from "axios"
import { createContext, useState } from "react"

export const AuthContext =createContext()

const AuthContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState()
    const getUnits=async(id)=>{
       
      
  const data= await axios.get(`http://localhost:8800/api/units/${id}`).then((res)=>{
    return res.data
   });
         
      return data
      }
    return <AuthContext.Provider value={{getUnits,currentUser,setCurrentUser}}>
    {children}
</AuthContext.Provider>
}
export default AuthContextProvider