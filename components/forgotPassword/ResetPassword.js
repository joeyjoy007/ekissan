
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import React, { useState } from "react";
import AppLoading from 'expo-app-loading';
import Loader from '../Loader'

import {
  useFonts,

  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,

  Montserrat_700Bold,

  Montserrat_900Black,

} from '@expo-google-fonts/montserrat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const ResetPassword = ({navigation}) =>{

    const [agree, setAgree] = useState(false)
    const [email, setEmail] = useState("")
const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
 

    

      const sendEmail =async()=>{
        setLoading(true)
if(!email || !code || !password){
  alert("fill field")
setLoading(false)
return
}
     


  try {
    const config = {
      headers:{
        "Content-Type":"application/json"
      },
    };

    const {data} = await axios.put("/resetPassword",{email,password,otpCode:code})
    alert("Password Updated")
    

 navigation.replace("Login")
    

    setLoading(false)
    // navigation.replace("Drawer")
  } catch (error) {
    alert(error.message)
    setLoading(false)
  }

    }

    const navigatetoRegister = ()=>{  
      navigation.navigate("Register")
    }

    const navigatetoForgotScreen = ()=>{  
      navigation.navigate("Forgot Password")
    }
    

    
  
    let [fontsLoaded] = useFonts({
    
     bold: Montserrat_300Light,
      Montserrat_400Regular,
      Montserrat_500Medium,
    
      regular:Montserrat_700Bold,
    
      Montserrat_900Black,
    });
  
    if(!fontsLoaded )
    {
      return <AppLoading/>;
    }
  
    return (
      <View style={styles.container}>
     
        <Text style={styles.mainHeader}>Reset Password</Text>
      

        

        <View style={styles.inputcontainer}>
          <Text style={styles.labels}>Enter Your Email</Text>
        </View>
        <TextInput
          placeholder="Email"
          style={styles.inputStyles}
          autoCapitalize="none"
          autoCorrect={true}
          value={email}
          onChangeText={(text)=>setEmail(text)}
        />
        <View style={styles.inputcontainer}>
        <Text style={styles.labels}>Enter Otp</Text>
      </View>
        <TextInput
          placeholder="Otp"
          style={styles.inputStyles}
          autoCapitalize="none"
          autoCorrect={true}
          value={code}
          onChangeText={(text)=>setCode(text)}
        />
        <View style={styles.inputcontainer}>
        <Text style={styles.labels}>Enter Your New Password</Text>
      </View>
        <TextInput
          placeholder="New Password"
          style={styles.inputStyles}
          autoCapitalize="none"
          autoCorrect={true}
          value={password}
          onChangeText={(text)=>setPassword(text)}
        />
       
     
  
  
        <TouchableOpacity onPress={()=>sendEmail()}  style={[styles.buttonStyle,{backgroundColor:"#4630eb"}]}>
        <Text style={styles.buttontext}>Update Password</Text>
        </TouchableOpacity>

  
        {loading? <Loader/> :null}
        
      </View>
    );
  }

export default ResetPassword

const styles = StyleSheet.create({
    container: {
        height: "100%",
        paddingHorizontal: 30,
        paddingTop: 30,
        borderColor: "#fff",
      },
      mainHeader: {
        fontSize: 25,
        color: "#344055",
        fontWeight: "500",
        paddingTop: 20,
        paddingBottom: 15,
        textTransform: "capitalize",
        fontFamily: "bold",
      },
     
      inputcontainer: {
        marginTop: 20,
      },
      labels: {
        fontSize: 18,
        color: "#7d7d7d",
        marginTop: 10,
        marginBottom: 5,
        lineHeight: 25,
        fontFamily: "regular",
      },
      inputStyles: {
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 1,
        fontFamily: "regular",
        fontSize: 18,
        borderColor: "rgba(0,0,0,0.3)",
      },
      buttonStyle:{
        height:40,
        display:"flex",
        justifyContent:"center",
        borderRadius:5,
        top:15
      },
      wrapper:{
        display:"flex",
        flexDirection:"row",
        paddingTop:30
      },
      wrapperText:{
        paddingHorizontal:10
    
      },
      buttontext:{
        color:"white",
        fontSize:20,
        alignSelf:"center"
      }

})