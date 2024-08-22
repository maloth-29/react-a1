import { configureStore } from "@reduxjs/toolkit";
import{appReducer}from './appReducer'
import logger from 'redux-logger'
import createsagaMiddleware from 'redux-saga'
import rooSaga from './sagas/rootSaga'
const sagaMiddleware=createsagaMiddleware()
export const appstore=configureStore({
    reducer:{
        appReducer
    },
    middleware:()=>{
        return[logger,sagaMiddleware]
    }

})

sagaMiddleware.run(rooSaga )