import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import Comment from './Comment';
import {useParams} from 'react-router-dom'
import toast from 'react-hot-toast';
const Lectures = ({sessionId,currentUser}) => {
  const [input, setInput] = useState();
  const [lec,setlec]=useState()
  const [index,setIndex]=useState()
  const [open,setOpen]=useState()
  const [change,setChange]=useState(false)
  const {id}=useParams()

  const enroll= currentUser?.enrolledClasses?.includes(id)

  const handleSubmit = async () => {
    try {
     await axios.post(`http://localhost:8800/api/lecture`, {
        sessionId:sessionId,
        contentUrl:input,

      });
      toast.success("Added");
      setChange(!change)
    } catch (error) {
      console.log(error);
    }
  };
  const getUrl=async()=>{
    try {
      const res = await axios.get(`http://localhost:8800/api/lecture/${sessionId}`);
      setlec(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
getUrl()
  },[change])

  return (
    <div className='parentlec'>
      {
        currentUser?.role==='admin' &&<div className="inneraddbook">
        <input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Lecture Url"
        ></input>
        <button className="submitchapterbtn" onClick={handleSubmit}>
          Submit
        </button>

       
      </div>
      }
          
 {lec?.map((item,idx)=>{
  return <div key={idx} className='lecturescontainer'>
      <h5 onClick={()=>{
        setOpen(!open)
        setIndex(idx)
      }}>Lecture {idx+1}</h5>
{
enroll ?<>  {
  (open && idx===index) &&<div className='youtubecontainer'>
    <ReactPlayer width="100%" url={item.contentUrl} />
    <Comment enroll={enroll} currentUser={currentUser} id={item._id}/>
  </div>
}</> :<><p style={{color:"red",fontWeight:"200"}}>Please Enroll first</p></>
}
    
  </div>
 })}
    </div>
   
  )
}

export default Lectures