import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { returnAction } from "./err"
import { CLEAR_ERROR, GET_ERRORS, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_SUCCESS, LOG_LOADING, REG_FAILED, REG_LOADING, REG_SUCCESS, USER_LOADED } from "./Types"

export const register =  ({name,email,password})=>async(dispatch)=>{
    dispatch({type:REG_LOADING,payload:null})

    const data = JSON.stringify({name,email,password})
    await axios({
        method:"POST",
        url:"http://a9ef-2409-4043-240d-11af-12eb-297f-5b08-6f1b.ngrok.io/signup",
        data,
        headers:{
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin":"http://localhost:19006/"
            
        }
    }).then((res)=>{
        dispatch({type:CLEAR_ERROR,payload:null})
        dispatch({type:REG_SUCCESS,payload:res.data})
    }).catch((err)=>{
        dispatch({type:REG_FAILED,payload:null})
        
    })
}



export const login =  ({name,email,password})=>async(dispatch)=>{
    dispatch({type:LOG_LOADING,payload:null})

    const data = JSON.stringify({name,email,password});
    
    await axios({
        method:"POST",
        url:"http://a9ef-2409-4043-240d-11af-12eb-297f-5b08-6f1b.ngrok.io/signin",
        data,
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        
        dispatch({type:CLEAR_ERROR,payload:null})
        
        dispatch({type:LOGIN_SUCCESS,payload:res.data})
        console.log(1)
    }).catch((err)=>{
        dispatch({type:LOGIN_FAILED,payload:null})

    })
}

export const loadUser = ()=>async(dispatch)=>{
    dispatch({type:LOG_LOADING,payload:null})
    const token = await AsyncStorage.getItem("token")
    console.log("GLOBAL TOKEN",token)

    await axios({
        method:"POST",
        url:"http://a9ef-2409-4043-240d-11af-12eb-297f-5b08-6f1b.ngrok.io/user",
        data,
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    }).then((res)=>{
        dispatch({type:USER_LOADED,payload:res.data})
    }).catch((err)=>[
        dispatch({type:GET_ERRORS,payload:null})
    ])

}

export const logoutt = ()=>async(dispatch)=>{
    await AsyncStorage.removeItem("token")
    console.log("item removed")
    return dispatch({
        type:LOGOUT_SUCCESS,
        payload:null
    })
}