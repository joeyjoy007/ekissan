import AsyncStorage from '@react-native-async-storage/async-storage'
import {createContext, useContext, useEffect, useState} from 'react'


const FarmerContext = createContext()


const ContextApis = ({children})=>{
 
    const [token, setToken] = useState("")
    const [userData, setuserData] = useState("")

 

    useEffect(() => {
      const tokens =AsyncStorage.getItem('token')
      setToken(tokens);
      console.log("CONTEXT",tokens)
    

     
    }, [])
    useEffect(() => {
     const data= AsyncStorage.getItem("userData")
     setuserData(data);
     console.log("DATACONTEXT",data)
    }, [])
    
   

    return <FarmerContext.Provider value={{token}}>{children}</FarmerContext.Provider>
}

export const FarmerState = ()=>{
    return useContext(FarmerContext)
}


export default ContextApis