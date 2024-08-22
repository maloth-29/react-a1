"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Ajax } from '@/servises/Ajax'

const Pagination=({currPage,setCurrPage, totalPages })=>{
    const inputRef=React.useRef()
    const fnGo=()=>{
       const pageNo=inputRef.current.value;
       if(pageNo<1 || pageNo > totalPages){
          alert("Invalid Entry");
          return;
       }
       setCurrPage(Number(pageNo))
    }
    const fnNext=()=>{
       setCurrPage(currPage+1)
    }
 
    const fnPrev=()=>{
       setCurrPage(currPage-1)
    }
    return <div>
          <span>Go To :<input ref={inputRef} type="number" /><button onClick={fnGo}>Go</button></span><button onClick={fnPrev} disabled={currPage==1}>Prev</button>{currPage}<button onClick={fnNext} disabled={currPage==totalPages}>Next</button><span>Total Pages:{totalPages}</span>
       </div>
 }

export const Users = () => {
   const students=useSelector((state)=>state?.appReducer?.students)
   
    const [currData,setCurrData]=useState([])
    const perPage=5;
    const [currPage,setCurrPage]=React.useState(1)
    const dispatch=useDispatch()
    React.useEffect(()=>{
       const end=currPage*perPage;
       const start=end-perPage;
       setCurrData(students.slice(start,end))
    },[currPage,students])
   
    useEffect(()=>{
        dispatch({type:"GET_STUDENTS"})
    },[])
    const handleEdit =(row)=>{
     
    
      dispatch({ type: "MODAL", payload: { isShowModal: true, student: row } })
      
      
    }
    const handleDelete=async(row)=>{
      const bool = confirm("R u sure...")
      if (bool){
      try {
         dispatch({ type: "LOADER", payload: true })
         const res = await Ajax.sendDeleteReq(`std/delete-std/${row?._id}`)
         const { acknowledged, deletedCount } = res?.data;
         if (acknowledged && deletedCount) {
             dispatch({ type: "GET_STUDENTS" })
             alert('success')
         } else {
             alert('fail')
         }
     } catch (ex) {

     } finally {
         dispatch({ type: "LOADER", payload: false })
     }
    }
   }
  return (
    <div><table border='2px' className="table table-bordered">
    <thead>
       <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Roll no</th>
          <th>Location</th>
          <th>Edit</th>
          <th>Delete</th>
       </tr>
    </thead>
    <tbody>
       {
        currData.map((obj,ind)=>{
         const {_id,name,rno,loc}=obj
             return <tr key={"tr"+ind}>
                   <td>{_id}</td>
                   <td>{name}</td>
                   <td>{rno}</td>
                   <td>{loc}</td>
                   <td><button onClick={()=> handleEdit(obj)}>Edit</button></td>
                   <td><button onClick={() => handleDelete(obj)}>Delete</button></td>
                </tr>
          })
       }
    </tbody>
 </table>
 <Pagination currPage={currPage} setCurrPage={setCurrPage} totalPages={Math.ceil(students?.length/perPage)} />
 </div> 
  )
}
