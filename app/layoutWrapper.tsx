'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Login } from "@/Login";
import{appstore }from '../redux/appstore'
import { Provider, useSelector } from "react-redux";
const inter = Inter({ subsets: ["latin"] });



export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  var isloggedIn=useSelector((state:any)=>{
    return state?.appReducer?.isLoggedIn
  })
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appstore}>
          
         {isloggedIn ?children:<Login/>}
        </Provider>
        </body>
    </html>
  );
}
