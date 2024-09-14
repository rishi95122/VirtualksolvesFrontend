import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';


const Comment = ({id,currentUser}) => {
    const [input, setInput] = useState();
    const [comments, setComments] = useState();
    const [change,setChange]=useState(false)
    const addComment=async()=>{
        try{
        await axios.post(`http://localhost:8800/api/comment`, {
          lectureId:id,
          userId:currentUser?._id,
          content:input
        });
        toast.success("Comment Added")
        setChange(!change)
      } catch (error) {
        console.log(error);
      }


      }
      useEffect(()=>{
        const getComments=async()=>{
        try {
            const res = await axios.get(`http://localhost:8800/api/comment/lecture/${id}`);
            
            setComments(res.data)
          } catch (error) {
            console.log(error);
          }}
          getComments()
      },[change])
     
  return (
    <div className='commentscontainer'><h3>Comments</h3>
    <div className='commentinput'>
      <input placeholder='comment' onChange={((e)=>setInput(e.target.value))} className='cinput'/>
      <button className='submitchapterbtn' onClick={addComment}>Add Comment</button>
      </div>
      <div className='viewcomment'>
            {
                comments?.length ? comments?.map((item,idx)=>{
                    return <div key={idx} className='singlecommentcontainer'>
                        
                <h5>{item?.userId?.name}</h5>
                <p className='realcomment'>{item?.content}</p>
                        </div>
                }) :<h1 className='nocontent'>No comment found</h1>
            }
            
      </div>
      <Toaster />
    </div>
  )
}

export default Comment