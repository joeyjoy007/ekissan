import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    useFonts,
  
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
  
    Montserrat_700Bold,
  
    Montserrat_900Black,
  
  } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { TextInput } from 'react-native-paper';
import * as Linking from 'expo-linking';


const pressCall=()=>{
    const url='tel://7987280833'
    Linking.openURL(url)
  }


const DetailedProduct = ({navigation,route}) => {

 
    const {detail} = route.params
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
    <View>
     <View style={styles.image}>
     <Image source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==", width:"100%",height:"100%"}}/>
     </View>
     <View style={styles.product}>
     <Text style={styles.texts}>Name: {detail.name}</Text>
     <Text style={styles.texts}>Price: {detail.price}</Text>
     <Text style={styles.texts}>Location: {detail.location}</Text>
     <Text style={styles.texts}>PinCode: {detail.pinCode}</Text>
     </View>
     <View style={[{display:"flex"}]}>
     <TouchableOpacity onPress={()=>pressCall()}>
     <Text style={[styles.texts,styles.t,{alignSelf:"flex-end"}]}><TextInput.Icon name="cellphone" />  7987280833</Text>
     </TouchableOpacity>
     </View>
    </View>
  )
}

export default DetailedProduct
const width=Dimensions.get("screen").width


const styles = StyleSheet.create({
    image:{
        borderWidth:1,
        height:"60%",
        elevation:4,
        shadowColor:"black",
        shadowOffset:{width:10,height:10},
        shadowOpacity:1,
        width:width-20,
        marginLeft:10
        
    },
    texts:{
        fontSize:20,
        fontFamily:"regular",
        paddingVertical:10

        
    },
    product:{
        width:width-20,
        marginLeft:10,
        paddingVertical:30
    },
    call:{
        width:width-20,
        
    },
    t:{
        width:width-220,
        color:"green"
    },
   
})