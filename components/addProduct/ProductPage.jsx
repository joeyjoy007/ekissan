import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { IconButton, Colors } from 'react-native-paper';
import { FarmerState } from '../context/ContextApi';

const ProductPage = () => {

    const [namee, setNamee] = useState("")
    const [price, setPrice] = useState()
    const [location, setLocation] = useState("")
    const [pinCode, setPinCode] = useState()
    const [city, setCity] = useState("")
    const [region, setRegion] = useState("")
    const [postalcode, setPostalcode] = useState("")
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [start, setStart] = useState(false)

    const {token} = FarmerState()

    const getLocation = async()=>{
      let {status} = await Location.requestForegroundPermissionsAsync()
      if(status !== "granted"){
        Alert.alert("Permission not granted","Allow the app to use Location service",
        [{text:"OK"}],
        {cancelable:false})
      }
      let coords = await Location.getCurrentPositionAsync()
      setLatitude(coords.coords.latitude)
      setLongitude(coords.coords.longitude)
      if(coords){
        setStart(true)
        const {latitude,longitude} = coords.coords;
        
        
        const response = await Location.reverseGeocodeAsync({
          latitude,longitude
        })
        
    
        for(let item of response){
          
          let address = `${item.city},${item.region},${item.postalCode}`
          
          alert(address)
          setCity(item.city)
          setRegion(item.region)
          setPostalcode(item.postalCode)
        }
      }
    }
  

    const addItem = async()=>{
        // const token = await AsyncStorage.getItem("token");
      
        await fetch("http://a9ef-2409-4043-240d-11af-12eb-297f-5b08-6f1b.ngrok.io/create",{
            method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + token._W,
                },
                body:JSON.stringify({
                    "name":namee,
                      "price":price,
                      "location":city,
                      "pinCode":postalcode
                  })
            
        })
        Alert.alert("Item Added",`${namee} added`)
    }

    const [text, setText] = React.useState("");
  return (
      <View style={styles.input}>
    <TextInput
    style={styles.inp}
      label="Product Name"
      value={namee}
      onChangeText={text => setNamee(text)}
    />
    <TextInput
    style={{marginTop:20}}
      label="Price"
      value={price}
      keyboardType="numeric"
      onChangeText={text => setPrice(text)}
    />
    <TextInput
    style={{marginTop:20}}
      label="Location"
      value={city}
      // onChangeText={text => setLocation(text)}
      right={<TextInput.Icon name="axis-arrow" onPress={getLocation} />}
    />
    <TextInput
    style={{marginTop:20}}
      label="PinCode"
      value={postalcode}
      keyboardType="numeric"
      // onChangeText={text => setPinCode(text)}
    />
    <View style={{marginTop:20}}>
    <Button  mode="contained" onPress={() => addItem()}>
    Add Product
  </Button>
    </View>
    {start ?
      (<MapView  initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
       style={styles.map} >
       <Marker 
       coordinate={{
        latitude,
        longitude
       }}
       pinColor="black"
       >
       <Callout>
       <Text>your location</Text>
       </Callout>
       
       </Marker>
       <Circle
        center={{
        latitude: latitude,
        longitude: longitude,
       }} 
       radius={1000}
        />
       </MapView>):<Text></Text>
      }
      
    </View>
  )
}

export default ProductPage

const styles = StyleSheet.create({
    input:{
        paddingHorizontal:20,
        paddingVertical:10,
       borderRadius:20
    },
    inp:{
        paddingHorizontal:20,
        paddingVertical:1
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
})