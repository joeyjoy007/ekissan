import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Loading = ({navigation}) => {

  const detectLogin = async()=>{
    const token = await AsyncStorage.getItem("token")

    if(token){
      navigation.replace("Drawer")
    }
    else{
     navigation.replace("Login")
    }
  }

useEffect(async() => {
detectLogin()
}, [])


  return (
    <View>
      <ActivityIndicator size="large" color="blue"/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})