import { configureStore } from "@reduxjs/toolkit";
import{appReducer}from './appReducer'
import logger from 'redux-logger'
export const appstore=configureStore({
    reducer:{
        appReducer
    },
    middleware:()=>{
        return[logger]
    }

})