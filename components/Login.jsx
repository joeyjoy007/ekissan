
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Checkbox from 'expo-checkbox';
import {useDispatch,useSelector} from 'react-redux'
import { useEffect} from "react";
import AppLoading from 'expo-app-loading';
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
import { login } from "./store/actions/authentication";
import Loader from "./Loader";
import { FarmerState } from "./context/ContextApi";
import { useState } from "react";

const Login = ({navigation}) =>{


const {setUser,setIsLoggedIn} = FarmerState()

const dispatch = useDispatch()

const auth = useSelector((state)=>state.auth)
const error = useSelector((state)=>state.err)


    const [agree, setAgree] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [checkMail, setCheckMail] = useState()

    const checkEmail = ()=>{
     const EMAIL = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/
     setCheckMail(EMAIL)
  
    }
    
  
    const [password, setPassword] = useState("") //gadd
  
      const onLogin =async()=>{ 
        setLoading(true)
if(!email || !password || email.length<13 || password.length<4 && checkMail.test(email) ){
  alert("fill all fields or check format")
setLoading(false)
return
}
      // dispatch(login({name,email,password}))
       
  // const {data}=await axios.post("http://4c3b-2409-4043-4e04-fc6e-5dff-6dd9-2bfb-6bac.ngrok.io/signin",{
  //   name,email,password
  // },{
 
  //   headers:{
  //     "Content-Type":"application/json"
  // }, 
  //  })
  //    try {
  //      await AsyncStorage.setItem("token",data.token)
     
  //       navigation.replace("Home")
  //    } catch (error) {
  //        console.log(error);
  //    }


  try {
    const config = {
      headers:{
        "Content-Type":"application/json"
      },
    };

  
    const {data} = await axios.post("https://kisaane.herokuapp.com/signin",{email,password,name},config)
 
    alert("login success")
    console.log("LOGIN",data)

    await AsyncStorage.setItem("data",JSON.stringify(data))
    setUser(data)
    setEmail("")
    setPassword("")
    setIsLoggedIn(true)
    

    setLoading(false)
    navigation.replace("Drawer")
  } catch (error) {
    alert("invalid credentials or internal server issue")
    setLoading(false)}

    }

    const navigatetoRegister = ()=>{  
      navigation.navigate("Register")
    }

    // const navigatetoForgotScreen = ()=>{  
    //   navigation.navigate("Forgot Password")
    // }


    // const getToken = async(token)=>{
    //   if(token){
    //     try {
    //       await AsyncStorage.removeItem("token");
    //       await AsyncStorage.setItem("token",token)

    //     } catch (error) {
    //       console.log("d",error.message)
    //     }
    //   }
    // }
   
    // useEffect(() => {  
    //   const {isAuthenticate,token}=auth
    //   getToken(token)
     
    //   if(isAuthenticate){
    //     navigation.replace("Drawer")
    //   }
    //  }, [auth])
    

    
  
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
      <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Image source={require('../assets/farmer.png')} style={{width:50,height:50}} />
      </View>
        <Text style={styles.mainHeader}>Login</Text>
      

        

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
          <Text style={styles.labels}>Enter Password</Text>
        </View>
        <TextInput
          placeholder="Password"
          style={styles.inputStyles}
          autoCapitalize="none"
          autoCorrect={true}
          secureTextEntry={true}
          value={password}
          onChangeText={(text)=>setPassword(text)}
        />
        <View>
        <Text style={styles.labelss}>min. 3 characters</Text>
      </View>
  
        <View style={styles.wrapper}>
        <Checkbox
        value={agree}
        onValueChange={()=>
          setAgree(!agree)}
         color={agree ?"#4630eb":undefined}
  
      
        />
        <Text style={styles.wrapperText}>I have read and agreed with TC</Text>
        </View>
       
  
        <TouchableOpacity onPress={()=>onLogin()} disabled={!agree} style={[styles.buttonStyle,{backgroundColor:agree?"#4630eb":"grey"}]}>
        <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>
  
      
        <TouchableOpacity onPress={()=>navigatetoRegister()} style={{paddingVertical:20,marginTop:20}}>
        <Text style={styles.wrapperText}>Not have any account <Text style={{fontWeight:"bold"}}>Register</Text></Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={()=>navigatetoForgotScreen()} style={{paddingVertical:5,marginTop:5,marginLeft:10}}>
 <Text style={{fontWeight:"bold"}}>Forgot Password ?</Text>
        </TouchableOpacity> */}
        {loading? <Loader/> :null}
        
      </View>
    );
  }

export default Login

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
      description: {
        fontSize: 20,
        color: "#7d7d7d",
        marginTop: 10,
        marginBottom: 5,
        lineHeight: 25,
        fontFamily: "regular",
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
      labelss: {
        fontSize: 12,
        color: "black",
        marginTop: 1,
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