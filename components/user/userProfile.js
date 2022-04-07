import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FarmerState } from '../context/ContextApi'

const UserProfile = ({navigation}) => {
  const {user,setIsLoggedIn,IsLoggedIn,setRemoveAll} = FarmerState()

    // const [userData, setUserData] = useState("fetching...")
    

    // const fetchUserDetail = async()=>{
    //   // const token = await AsyncStorage.getItem("token")
    //   const {data} = await axios.get("https://kisaane.herokuapp.com/f", {
    //     headers: {
    //       "Content-Type":"application/json",
    //       Authorization: `Bearer ${user.token}`,
    //     }},)
    //     setUserData(data)
   

    // }
    // useEffect(() => {
    //   fetchUserDetail()
    // }, [])  //Help Me
    
    const logout = async()=>{
     const k= await AsyncStorage.removeItem("data")
     console.log("first",k)
    //  setRemoveAll(true)
      setIsLoggedIn(false)
      navigation.replace("Login")
    
    }

  return (
    <View>
    <View style={styles.background}>
    <Text style={{color:"white",display:"flex",position:"absolute",top:100,alignSelf:"center",borderWidth:1,borderColor:"white",width:100,height:100,borderRadius:50}}></Text>
    </View>
      
      <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:20,padding:20}}>
      
      <View >
      <Text  style={styles.name}>Name: {user.name}</Text>
      </View>
      <View style={styles.email}>
      <Text  style={styles.email}>Email: {user.email}</Text>
      </View>
      <View style={styles.email}>
      <Button title="logout" onPress={logout}/>
      </View>
      </View>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
    name:{
        fontWeight:"bold",
      fontSize:20,
      color:"red"
    },
    email:{
        fontWeight:"bold",
      fontSize:20,
      color:"red",
      marginTop:15
    },
    background:{
        backgroundColor:"black",
        width:"100%",
        height:"40%",
        position:"relative"
    }
})