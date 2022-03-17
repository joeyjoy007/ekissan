import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserProfile = () => {
  return (
    <View>
    <View style={styles.background}>
    <Text style={{color:"white",display:"flex",position:"absolute",top:100,alignSelf:"center",borderWidth:1,borderColor:"white",width:100,height:100,borderRadius:50}}></Text>
    </View>
      
      <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:20,padding:20}}>
      
      <View >
      <Text  style={styles.name}>Name: Piyush</Text>
      </View>
      <View style={styles.email}>
      <Text  style={styles.email}>Email: Piyush@gmail.com</Text>
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