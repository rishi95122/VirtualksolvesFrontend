import React from 'react'
import './profilecard.css'
import { Link } from 'react-router-dom'
const ProfileCard = ({setProfileOPen}) => {
  return (
    <div className='profilecard'>
        <div className='profileinnerdiv'>
            <Link to="/addclass">  <p onClick={()=>{setProfileOPen(prev=>!prev)}} className='profiletag'>Add class</p></Link>
        </div>
    </div>
  )
}

export default ProfileCard