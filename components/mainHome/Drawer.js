import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../Homes/Home';
import Home2 from '../Homes/Home2';
import UserProfile from '../user/userProfile';
import MainHome from './MainHome';
import { useNavigation } from '@react-navigation/native';



const Drawer = () => {
    const Drawerr = createDrawerNavigator();
    const navigationn = useNavigation()

    useEffect(() => {
   
      navigationn.setOptions({
        headerShown:false,
        
        
      })
     }, [])
  return (
     
    <Drawerr.Navigator initialRouteName='Mainhome' screenOptions={{headerStyle: {
      backgroundColor: '#f4511e',
     
      
    }, gesturesEnabled:false}}>
    <Drawerr.Screen name="Mainhome" options={{title:"eKisan",
    navigationOptions: {
      gesturesEnabled: false,
  },
  }} component={MainHome} />
    <Drawerr.Screen name="Machinaries"  component={Home2} />
      <Drawerr.Screen name="Vehicle" component={Home} />
     

      <Drawerr.Screen name="User"  component={UserProfile} />
      
      
    </Drawerr.Navigator>
 
  )
}

export default Drawer

const styles = StyleSheet.create({})