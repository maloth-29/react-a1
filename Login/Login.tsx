import React, { useState } from 'react'
import { Ajax } from '@/servises/Ajax'
import { useDispatch } from 'react-redux';


export const Login = () => {
  const dispatch = useDispatch();
  const [data,setData]=useState({})
  const handleChange=(eve:any)=>{
    const{id,value}=eve.target;
    setData({
      ...data, 
      [id]:value
    })

  }
  const handleClick= async ()=>{
     try{
     const res= await Ajax.sendPostReq('std/login',data)
     console.log(res)
     if(res?.data?.length > 0){
      if(typeof window !== "undefined"){
      sessionStorage.user = res?.data?.[0]?.uid
      sessionStorage.token = res?.data?.[0]?.token
      }
      dispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: res?.data?.[0]?.uid } })

     }else{
      alert('plese check the ui and pwd')
     }
     }catch(ex){

     }

  }

  return (
    <div>
        <h3>Login</h3>
        <p>
            <b>uid:</b><input id='uid' onChange={handleChange}/>
        </p>
        <p>
            <b>pwd:</b><input id='pwd' onChange={handleChange} type='password'/>
        </p>
        <p>
            <button onClick={handleClick}>LOGIN</button>
        </p>
    </div>
  )
}
export default Login;
