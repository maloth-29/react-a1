'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Login } from "@/Login";
import{appstore }from '../redux/appstore'
import { Provider, useSelector } from "react-redux";
const inter = Inter({ subsets: ["latin"] });
import LayoutWrapper from './layoutWrapper'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={appstore}>
          
        <LayoutWrapper>
          {children}
         </LayoutWrapper>
        </Provider>
        </body>
    </html>
  );
}
