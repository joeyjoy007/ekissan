import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import AddMachinaries from '../addProduct/addMachinaries'
import ProductPage from '../addProduct/VehicleAdd'
import { FarmerState } from '../context/ContextApi'
import ForgotPassword from '../forgotPassword/ForgotPassword'
import ResetPassword from '../forgotPassword/ResetPassword'
import Home from '../Homes/Home'
import Home2 from '../Homes/Home2'
import Loading from '../Loading'
import Login from '../Login'
import Drawer from '../mainHome/Drawer'
import MainHome from '../mainHome/MainHome'
import Register from '../Register'
import UserProfile from '../user/userProfile'
import DetailedProduct from '../viewProducts/DetailedProduct'
import ViewMachinaries from '../viewProducts/ViewMachinaries'
import ViewProducts from '../viewProducts/ViewProducts'

const AllNavigations = () => {
    const stack = createNativeStackNavigator()

    const {isLoggedIn} = FarmerState()
    
  return (


    
    <stack.Navigator initialRouteName={isLoggedIn?"Drawer":"Register"} screenOptions={{gestureEnabled:false,headerStyle: {
        backgroundColor: '#f4511e',
      },  headerTintColor: '#fff',headerTitleStyle: {
        fontWeight: 'bold',
      },headerTitleAlign:"center"}} >


  
      <stack.Screen name="Loading" component={Loading} />


      <stack.Screen name="Home"  component={Home} 
      options={{  headerStyle: {
        backgroundColor: '#f4511e',
      },  headerTintColor: '#fff',headerTitleStyle: {
        fontWeight: 'bold',
      },headerTitleAlign:"center",title:'Transportation Vehicle'}}
      
      />

      <stack.Screen name="Home2" options={{
        title:"Machinaries"
      }} component={Home2}
  
      />


  

    {/*gadd*/ }

      {isLoggedIn ? (
              <stack.Screen name="Drawer" options={({ navigation }) => ({
                title: 'eKisan',
                headerStyle: {
                  backgroundColor: '#f4511e',
                  
                },
               
                headerLeft:null,
                headerBackVisible:"false",
                
                headerTintColor: '#EBF2FA',
               
              })} component={Drawer}  />
        
      ):(
          <>
            <stack.Screen name="Register" component={Register}
      
      />


      <stack.Screen name="Login" component={Login}
      
      />
          </>
      )}


      <stack.Screen name="Product" options={{
        title:"Add Vehicle"
      }} component={ProductPage}
      />


      <stack.Screen name="ProductDetail" options={{
        title:"Product Detail"
      }} component={DetailedProduct}
      />

      <stack.Screen name="AddMachinaries" options={{
        title:"Add Machinaries"
      }} component={AddMachinaries}
      

      />

      <stack.Screen name="Forgot Password" options={{
        title:"Forgot Password"
      }} component={ForgotPassword}
      
      />
      
      <stack.Screen name="Reset Password" options={{
        title:"Reset Password"
      }} component={ResetPassword}
      
      />

     


  { /*   <stack.Screen name="MainHome" component={MainHome} options={{  headerStyle: {
        backgroundColor: '#f4511e',
      },  headerTintColor: '#fff',headerTitleStyle: {
        fontWeight: 'bold',
      },headerTitleAlign:"center",headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title={  <Avatar.Image size={24} source={{uri:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg=="}} />}
            color="#fff"
          />
        ),}} />*/
}




      <stack.Screen name="MainHome" component={MainHome} options={({ navigation }) => ({
        title: 'Home',
        headerLeft:"null",
        headerStyle: {
          backgroundColor: '#273469',
          headerLeft:"null"
          
        },
       
        
        
        headerTintColor: '#EBF2FA',
        headerRight: () => (
          <Button
            onPress={() => navigation.navigate("UserProfile")}
            title="profile"
            color="#fff"
          />
        ),
      })} />


      <stack.Screen name="ViewProducts" options={
        {
          title:"View Vehicles"
        }
      } component={ViewProducts} />
      
      <stack.Screen name="ViewMachinaries" options={{
        title:"View Machinaries"
      }} component={ViewMachinaries} />
      <stack.Screen name="UserProfile" component={UserProfile}  />
      
      </stack.Navigator>

  )
}

export default AllNavigations