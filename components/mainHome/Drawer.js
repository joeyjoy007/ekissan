import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Homes/Home';
import Home2 from '../Homes/Home2';
import UserProfile from '../user/userProfile';
import MainHome from './MainHome';
import Cmap from '../addProduct/Cmap';



const Drawer = () => {
    const Drawerr = createDrawerNavigator();
  return (
     
    <Drawerr.Navigator initialRouteName='Mainhome' >
    <Drawerr.Screen name="Mainhome" options={{title:"Products"}} component={MainHome} />
      <Drawerr.Screen name="Vehicle" component={Home} />
      <Drawerr.Screen name="Machinaries"  component={Home2} />
      <Drawerr.Screen name="CheckMap"  component={Cmap} />
      <Drawerr.Screen name="User"  component={UserProfile} />
      
      
    </Drawerr.Navigator>
 
  )
}

export default Drawer

const styles = StyleSheet.create({})