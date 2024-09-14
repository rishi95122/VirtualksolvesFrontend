import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddChapterForm from "./AddChapterForm";
import {AuthContext} from '../../context/authContext'
import toast from "react-hot-toast";
function ClassContent({ id,enroll }) {
  const {currentUser,getUnits}=useContext(AuthContext)
  const [input, setInput] = useState();
  const [index,setIndex]=useState()
  const [open,setOpen]=useState()
  const [Units,setUnits]=useState()
  const [change,setChange]=useState(false)
  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:8800/api/units`, {
        classId: id,
        title: input,
      });
      toast.success("Unit added")
      setChange(!change)
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(()=>{
 
 getUnits(id).then((res)=>{
 setUnits(res)
 })


  },[open,change])
console.log("SDs")
  return (
    <div className="classcontent">
      <div className="addbook">
        <h2>Class Content</h2>
        {
          currentUser?.role==='admin' &&  <div className="inneraddbook">
          <input
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Unit name"
          ></input>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        }
       
      </div>

     {
     (Units?.length) ? Units?.map((item,idx)=>{
        return <div key={idx}> <div className="singleunit" onClick={()=>{setIndex(idx)
          setOpen(!open)}
        }>
        <h3>{item?.title}</h3>
      </div>
      {
        (index===idx && open)&&<div className="chapters">
            <AddChapterForm enroll={enroll} currentUser={currentUser} id={item._id}/>
            
        </div>
      }
      </div>
      }) :<h1 className="nocontent">No units available</h1>
     }
    </div>
  );
}

export default ClassContent;
