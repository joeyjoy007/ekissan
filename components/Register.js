
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { useEffect, useState } from "react";
import AppLoading from 'expo-app-loading';
import {useDispatch , useSelector} from 'react-redux'
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
import { loadUser, register } from "./store/actions/authentication";
import Loader from "./Loader";
const Register = ({navigation}) =>{
  const dispatch = useDispatch()

  const auth = useSelector((state)=>state.auth)
  const error = useSelector((state)=>state.err)

    const [agree, setAgree] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
  
    const [password, setPassword] = useState("")
  
    const onRegister =async ()=>{
      dispatch(register({name,email,password}))
//    const {data} = await axios.post("http://4c3b-2409-4043-4e04-fc6e-5dff-6dd9-2bfb-6bac.ngrok.io/signup",{
//      name,email,password
//    },{
//        headers:{
//            "Content-Type":"application/json"
//        },
//    })
//    try {
//     await AsyncStorage.setItem("token",data.token)
//     navigation.replace("Home")
//  } catch (error) {
//      console.log(error.message);
//  }

    }

    const navigatetoLogin = ()=>{
      navigation.navigate("Login")
    }
    useEffect(() => {
     console.log(auth.isAuthenticate)
      if(auth.isAuthenticate){
        
        navigation.replace("Drawer")
      }
    }, [auth])


    // useEffect(() => {
    //   dispatch(loadUser())
    // }, [])
    
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
        <Text style={styles.mainHeader}>Register</Text>
        <Text style={styles.description}></Text>


        <View style={styles.inputcontainer}>
          <Text style={styles.labels}>Enter Your Name</Text>
        </View>
        <TextInput
          placeholder="Name"
          style={styles.inputStyles}
          autoCapitalize="none"
          autoCorrect={true}
          value={name}
          onChangeText={(text)=>setName(text)}
        />
  
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
  
        <View style={styles.wrapper}>
        <Checkbox
        value={agree}
        onValueChange={()=>
          setAgree(!agree)}
         color={agree ?"#4630eb":undefined}
  
      
        />
        <Text style={styles.wrapperText}>I have read and agreed with TC</Text>
        </View>
        <View>
        
       
      
        </View>
        <TouchableOpacity onPress={()=>onRegister()} disabled={!agree} style={[styles.buttonStyle,{backgroundColor:agree?"#4630eb":"grey"}]}>
        <Text style={styles.buttontext}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigatetoLogin()} style={{paddingVertical:20}}>
        <Text style={styles.wrapperText}>Already have an account <Text style={{fontWeight:"bold"}}>Login</Text></Text>
        </TouchableOpacity>
       {auth.regLoading ? <Loader/> :null}
      </View>
    );
  }

export default Register

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