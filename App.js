import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./components/Login";
import Home from "./components/Home";

import Register from "./components/Register";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./components/Loading";
import ProductPage from "./components/addProduct/ProductPage";
import ViewProducts from "./components/viewProducts/ViewProducts";
import { Provider,useDispatch } from 'react-redux';
import store from './components/store/index'


import UserProfile from "./components/user/userProfile";
import axios from "axios";

import { loadUser } from "./components/store/actions/authentication";


const stack = createNativeStackNavigator()

export default function App() {






const [isLoggedIn, setIsLoggedIn] = useState(null)



const detectLogin = async()=>{
  const token = await AsyncStorage.getItem("token")

if(token){
  setIsLoggedIn(true)
}
else{
  setIsLoggedIn(false)
}
}

useEffect(async() => {
detectLogin()
}, [])




  return (
    <Provider store={store}>
    
    <NavigationContainer>

   
    <stack.Navigator initialRouteName="Register">


    
        <stack.Screen name="Loading" component={Loading} />
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="Register" component={Register} />
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="Product" component={ProductPage} />
        <stack.Screen name="ViewProducts" component={ViewProducts} options={{  headerStyle: {
          backgroundColor: '#f4511e',
        },  headerTintColor: '#fff',headerTitleStyle: {
          fontWeight: 'bold',
        },headerTitleAlign:"center"}} />
        <stack.Screen name="UserProfile" component={UserProfile} options={{  headerStyle: {
          backgroundColor: '#f4511e',
        },  headerTintColor: '#fff',headerTitleStyle: {
          fontWeight: 'bold',
        },headerTitleAlign:"center"}} />
        

      
    
   


  
    </stack.Navigator>


    </NavigationContainer>
    </Provider>
    
   
  );

}

const styles = StyleSheet.create({
  container: {
    height: "100%",
   
   
    borderColor: "#fff",
  },
 
 
});
