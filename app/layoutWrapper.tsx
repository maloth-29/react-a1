'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Login } from "@/Login";
import{appstore }from '../redux/appstore'
import { Provider, useDispatch, useSelector } from "react-redux";
import { UseDispatch } from "react-redux";
import React,{ useEffect } from "react";
import { Modal } from "../Modal";
import { Loader } from "@/Loader";
const inter = Inter({ subsets: ["latin"] });



export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch=useDispatch()
  useEffect(()=>{
    if(typeof window !== 'undefined' && sessionStorage?.user ){
      dispatch({ type: "LOGIN", payload: { isLoggedIn: true, user: sessionStorage?.user} })
    }
  })
  var isloggedIn=useSelector((state:any)=>{
    return state?.appReducer?.isLoggedIn
  })
  var user=useSelector((state:any)=>{
    return state?.appReducer?.user
  })
  var isShowModal=useSelector((state:any)=>{
    return state?.appReducer?.isShowModal
  })
  var isShowLoader=useSelector((state:any)=>{
    return state?.appReducer?.isShowLoader
  })
  const handeleLogout=()=>{
    const bool=confirm('are you sure to logout')
    if(bool){
      sessionStorage.clear()
      dispatch({ type: "LOGIN", payload: { isLoggedIn: false, user: ""}})
    }
  
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appstore}>
          
         {isloggedIn ?<div>
          <h3>{user}</h3>
          <div><button onClick={handeleLogout}>Logout</button></div>
          {children}
          </div>:<Login/>}
          {isShowModal && <Modal/>}
       {  isShowModal &&  <Loader/>}
        </Provider>
        </body>
    </html>
  );
}
