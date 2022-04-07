import 'react-native-gesture-handler';
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./components/Login";
import Home from "./components/Homes/Home";

import Register from "./components/Register";
import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./components/Loading";
import ProductPage from "./components/addProduct/VehicleAdd"; // gary add
import ViewProducts from "./components/viewProducts/ViewProducts";
import { Provider,useDispatch } from 'react-redux';
import store from './components/store/index'
import { Avatar } from 'react-native-paper';



import UserProfile from "./components/user/userProfile";
import axios from "axios";

import { loadUser } from "./components/store/actions/authentication";
import MainHome from "./components/mainHome/MainHome";
import Home2 from "./components/Homes/Home2";
import AddMachinaries from "./components/addProduct/addMachinaries";
import ViewMachinaries from "./components/viewProducts/ViewMachinaries";
import Drawer from './components/mainHome/Drawer';
import DetailedProduct from './components/viewProducts/DetailedProduct';
import ContextApis from './components/context/ContextApi';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import AllNavigations from './components/allNavigations/AllNavigations';





// const stack = createNativeStackNavigator()

export default function App() {


 



// const [isLoggedIn, setIsLoggedIn] = useState(null)


// const detectLogin = async()=>{
//   const token = await AsyncStorage.getItem("data")  // gary add
//   console.log("OOOO",token)

// if(token){
//   setIsLoggedIn(true)
// }
// else{
//   setIsLoggedIn(false)
// }
// }

// useEffect(async() => {
// detectLogin()
// }, [])




  return (

    <Provider store={store}>
    <ContextApis>

    <NavigationContainer>

    
   
    <AllNavigations/>


    </NavigationContainer>
    </ContextApis>
    </Provider>
    
   
  );

}

const styles = StyleSheet.create({
  container: {
    height: "100%",
   
   
    borderColor: "#fff",
  },
 
 
});
