import AsyncStorage from '@react-native-async-storage/async-storage'
import {createContext, useContext, useEffect, useState} from 'react'


const FarmerContext = createContext()


const ContextApis = ({children})=>{
 
    const [user, setUser] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)


 


    useEffect(async () => {
      const userInfo =JSON.parse(await AsyncStorage.getItem('data'))
     
  
      setUser(userInfo);
     
      

      // const value = await AsyncStorage.getItem("@Test");
      // return JSON.parse(value)
    

     
    }, [])
   
    useEffect(() => {
      if(isLoggedIn === false){
        console.log(11)
        AsyncStorage.clear()
        setUser("")
      }
    }, [isLoggedIn])
    
    
   
   

    return <FarmerContext.Provider value={{user,setUser,isLoggedIn,setIsLoggedIn}}>{children}</FarmerContext.Provider>
}

export const FarmerState = ()=>{
    return useContext(FarmerContext)
}


export default ContextApis