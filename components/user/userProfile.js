import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FarmerState } from '../context/ContextApi'

const UserProfile = () => {
  const {token} = FarmerState()

    const [userData, setUserData] = useState("fetching...")

    const fetchUserDetail = async()=>{
      // const token = await AsyncStorage.getItem("token")
      const {data} = await axios.get("http://a9ef-2409-4043-240d-11af-12eb-297f-5b08-6f1b.ngrok.io/f", {
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${token._W}`,
        }},)
        setUserData(data)
   AsyncStorage.setItem("userData",data)

    }
    useEffect(() => {
      fetchUserDetail()
    }, [])
    

  return (
    <View>
    <View style={styles.background}>
    <Text style={{color:"white",display:"flex",position:"absolute",top:100,alignSelf:"center",borderWidth:1,borderColor:"white",width:100,height:100,borderRadius:50}}></Text>
    </View>
      
      <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:20,padding:20}}>
      
      <View >
      <Text  style={styles.name}>Name: {userData.name}</Text>
      </View>
      <View style={styles.email}>
      <Text  style={styles.email}>Email: {userData.email}</Text>
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
      color:"red"
    },
    background:{
        backgroundColor:"black",
        width:"100%",
        height:"40%",
        position:"relative"
    }
})