import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductPage = () => {

    const [namee, setNamee] = useState("")
    const [price, setPrice] = useState()
    const [location, setLocation] = useState("")
    const [pinCode, setPinCode] = useState()

  

    const addItem = async()=>{
        const token = await AsyncStorage.getItem("token");
        console.log("TOKEN",token)
        await fetch("http://localhost:4000/create",{
            method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: "Bearer " + token,
                },
                body:JSON.stringify({
                    "name":namee,
                      "price":price,
                      "location":location,
                      "pinCode":pinCode
                  })
            
        })
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
      value={location}
      onChangeText={text => setLocation(text)}
    />
    <TextInput
    style={{marginTop:20}}
      label="PinCode"
      value={pinCode}
      keyboardType="numeric"
      onChangeText={text => setPinCode(text)}
    />
    <View style={{marginTop:20}}>
    <Button  mode="contained" onPress={() => addItem()}>
    Add Product
  </Button>
    </View>
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
    }
})