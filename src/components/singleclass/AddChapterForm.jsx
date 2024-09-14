import axios from 'axios';
import { useEffect, useState } from 'react'
import Lectures from './Lectures';
import toast from 'react-hot-toast';

const AddChapterForm = ({id,currentUser,enroll}) => {
    const [input, setInput] = useState();
    const [chapters,setChapters]=useState()
    const [index,setIndex]=useState()
    const [open,setOpen]=useState()
    const [change,setChange]=useState(false)
    const handleSubmit = async () => {
        try {
         await axios.post(`http://localhost:8800/api/session`, {
            unitId:id,
            title: input,
          });
          toast.success("Chapter Added");
          setChange(!change)
        } catch (error) {
          console.log(error);
        }
      };
      const getChapters=async()=>{
        try {
          const res = await axios.get(`http://localhost:8800/api/session/${id}`);
          setChapters(res.data)
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
getChapters()
      },[open,change])
      console.log("SDf")
  return (
    <div className='chaptercontent'>
      {
        currentUser?.role==='admin' &&
        <div className="inneraddbook">
      <input
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Chapter name"
      ></input>
      <button className="submitchapterbtn" onClick={handleSubmit}>
        Submit
      </button>

     
    </div>
      }
        <div className='chaptercontainer'>
            {
            chapters?.length ? chapters?.map((item,idx)=>{
                return <div key={idx}  className='singlechapter'>
                  <p onClick={()=>{
                  setOpen(!open)
                  setIndex(idx)
                }}>{item.title}</p>
                 {
                  (open && index===idx) &&  <div className='lec'>
                      <Lectures enroll={enroll} currentUser={currentUser} sessionId={item._id}/>
                  </div>
                 }
                </div>
              }) :<h1 className='nocontent'>No chapter found</h1>
            }
          </div>
    </div>
  )
}

export default AddChapterForm