"use client"
import { Ajax } from '@/servises/Ajax'
import React, { useState } from 'react'

export const Register = () => {
    const [data,setData]=useState({})
    const fnRegister=async()=>{
        try{
            var dataObj={
            "data":data
        }
           const res= await Ajax.sendPostReq('std/register',dataObj)
         
           const { acknowledged, insertedId } = res?.data;
            if (acknowledged && insertedId) {
                alert('success')
            } else {
                alert('fail')
            }
           console.log(res?.data)
        }catch(exe){
            console.error(exe)
        }
    }
    const  handlechange=(eve:any)=>{
        const{name,value}=eve.target;
        setData({...data,[name]:value})
    }
  return (
    <div>
        <h3>Register</h3>
        <p>
            <b>Name:</b><input name='name' onChange={handlechange}/>
        </p>
        <p>
            <b>Roll no:</b><input name='rno' type='number' onChange={handlechange}/>
        </p>
        <p>
            <b>Location:</b><textarea name='loc' onChange={handlechange}/>
        </p>
        <p>
            <button onClick={fnRegister}>register</button>
        </p>
        
    </div>
  )
}
