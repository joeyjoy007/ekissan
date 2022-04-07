
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Checkbox from 'expo-checkbox';
import {useDispatch,useSelector} from 'react-redux'
import React, { useEffect, useRef, useState } from "react";
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


const ForgotPassword = ({navigation}) =>{

    const [agree, setAgree] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
 

    

      const sendEmail =async()=>{

        setLoading(true)
if(!email){

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
   

    const {data} = await axios.post("https://kisaane.herokuapp.com/forgotPassword",{email})

    
    if(data.statusText ==="error"){
      alert('email not found')
      setLoading(false)
      return
    }
    alert("Email Send")
    navigation.replace("Reset Password")
    


    

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
     
        <Text style={styles.mainHeader}>Forgot Password</Text>
      

        

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
       
     
  
  
        <TouchableOpacity onPress={()=>sendEmail()}  style={[styles.buttonStyle,{backgroundColor:"#4630eb"}]}>
        <Text style={styles.buttontext}>Send Mail</Text>
        </TouchableOpacity>

  
        {loading? <Loader/> :null}
        
      </View>
    );
  }

export default ForgotPassword

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