import { Alert, Dimensions, Image, ImageBackground, LogBox, Platform, StyleSheet,ScrollView, Text, View } from "react-native";
import React, { useState ,useEffect} from "react";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import MapView, { Callout, Circle, Marker,PROVIDER_GOOGLE } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";

import { FarmerState } from "../context/ContextApi";
import axios from "axios";



const firebaseConfig = {
  apiKey: "AIzaSyAGFr2H118Re6oaWQ5IeLDM8Qlok4lu-A4",
  authDomain: "ekisaan-bb386.firebaseapp.com",
  projectId: "ekisaan-bb386",
  storageBucket: "ekisaan-bb386.appspot.com",
  messagingSenderId: "20784616759",
  appId: "1:20784616759:web:96e5999777cbb48ff476b2"
};


// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Firebase sets some timeers for a long period, which will trigger some warnings. Let's turn that off for this example
LogBox.ignoreLogs([`Setting a timer for a long period`]);

const ProductPage = () => {
  const [namee, setNamee] = useState("");
  const [price, setPrice] = useState();

  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [start, setStart] = useState(false);
  const [image, setImage] = useState(null)
const [upload, setUpload] = useState(false)
const [imagename, setImagename] = useState("")
const [loading, setLoading] = useState(false)
const [changeButton, setChangeButton] = useState(false)
const [modelNumber, setModelNumber] = useState("")
const [loadCapacity, setLoadCapacity] = useState("")
const [description, setDescription] = useState("")
const [pinCode, setPinCode] = useState("")

const {user} = FarmerState()

const permission = async()=>{
  if (Platform.OS !== "web") {
    const {status} =await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("we need camera roll permissions to make this work!");
    }
  }
}

  useEffect(() => {
  permission()
  }, [])


 

  const addItem = async () => {
    // const token = await AsyncStorage.getItem("token");
    // console.log("TOKEN", token);
    if(!namee || !price ||!city || !postalcode  ||!modelNumber ){
      alert("fill all fields")
    }
    try {

      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${user.token}`
        },
       
      }

      const {data} = await axios.post("https://kisaane.herokuapp.com/createVehicle",{ name: namee,
      price: price,
      location: city,
      pinCode: pinCode,
      image:imagename ?imagename:"https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg",
   
    modelNumber:modelNumber,
    loadCapacity:loadCapacity,
    desc:description
  },config)

      alert("Item Added", `${namee} added`);
    } catch (error) {
      
      alert(error.message)
    }
   
       
      
    
   
  };





const maybeRenderUploadingOverlay = () => {
  if (upload) {
    return (
      <View>
      
      </View>
    );
  }
};


const maybeRenderImage = () => {
  
  if (!image) {
    return;
  }

  return (
    <View
      style={{
        marginTop: 30,
        width: 250,
        borderRadius: 3,
        elevation: 2,
      }}>
   {}
    </View>
  );
};







  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use Location service",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
    let coords = await Location.getCurrentPositionAsync();
    setLatitude(coords.coords.latitude);
    setLongitude(coords.coords.longitude);
    if (coords) {
      setStart(true);
      const { latitude, longitude } = coords.coords;
      
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.city},${item.region},${item.postalCode}`;

        alert(address);
        setCity(item.city);
        setRegion(item.region);
        setPostalcode(item.postalCode);
      }
    }
  };

  const share = () => {
    share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

 

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });


   handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    setLoading(true)
    try {

      setUpload(true)
      
      if (!pickerResult.cancelled) {
       
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
        setImagename(uploadUrl)
        alert("Image uploaded successfully")
      
      }
      setLoading(false)
      setChangeButton(true)
  
    } catch (e) {
      setLoading(false)
      alert("Upload failed, sorry :(");
    } finally {
      setUpload(false)
    }
  };


  async function uploadImageAsync(uri) {
  
    console.log("going")
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        
        reject(new TypeError("Network request failed"));
      };
      console.log(23)
      xhr.responseType = "blob";
      console.log(24)
      xhr.open("GET", uri, true);
      console.log(25)
      xhr.send(null);
      console.log(26)
    });
  console.log(27)
    const fileRef = ref(getStorage(), uuid.v4());
    console.log(28)
    const result = await uploadBytes(fileRef, blob);
    console.log(29)
   
   
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await getDownloadURL(fileRef);
  }

  const [text, setText] = React.useState("");
  return (
    <ImageBackground style={styles.containerr} source={{uri:"https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVnZW5lcmF0aXZlJTIwYWdyaWN1bHR1cmV8ZW58MHx8MHx8&w=1000&q=80"}}>
<ScrollView>
    <View style={styles.input}>
      <TextInput
        style={styles.inp}
        label="Product Name"
        value={namee}
        onChangeText={(text) => setNamee(text)}
      />
      
      <TextInput
        style={{ marginTop: 20 }}
        label="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={(text) => setPrice(text)}
      />
      {/*!!image && (
     
      )*/}

     
      
      {maybeRenderImage()}
      {maybeRenderUploadingOverlay()
      
      }
    


      <TextInput
        style={{ marginTop: 20 }}
        label="Location"
        value={city}
        // onChangeText={text => setLocation(text)}
        right={<TextInput.Icon name="axis-arrow" onPress={getLocation} />}
      />

      <TextInput
        style={{ marginTop: 20 }}
        label="PinCode"
        // value={postalcode}
        value={pinCode}
        keyboardType="numeric"
        onChangeText={text => setPinCode(text)}
      />

      <TextInput
      style={{ marginTop: 20 }}
      label="Load Capacity (optional)"
      value={loadCapacity}
  
      onChangeText={text => setLoadCapacity(text)}
    />


      <TextInput
      style={{ marginTop: 20 }}
      label="Vehicle number"
      value={modelNumber}
      onChangeText={text => setModelNumber(text)}
     
    />

    <TextInput
    style={{ marginTop: 20 }}
    label="Description (optional)"
    multiline={true}
      numberOfLines={4}
      onChangeText={(val) => setText(val)}
      value={description}
      onChangeText={text=>setDescription(text)}
  />

      <View style={{marginTop:20}}>

      { changeButton ?(
        <Button mode="contained" style={{backgroundColor:"red"}} onPress={pickImage} disabled="true">
        image uploaded
       </Button>
      ):(
        <Button mode="contained" color="red" onPress={pickImage} loading={loading}>
        upload image (optional)
       </Button>
      )}
      
      </View>
      <View style={{ marginTop: 20 }}>

      {! namee || !price || !city || !postalcode  || !modelNumber ?(
        <Button mode="contained"  style={{backgroundColor:"red"}} onPress={() => addItem()} disabled="true">
          Add Product
        </Button>
        
      ):(
        <Button mode="contained" onPress={() => addItem()} disabled={loading} >
        Add Product
      </Button>
      
      )}
        


        {start ? (
          <>
          <MapView
          provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.map}
          >
            <Marker
              coordinate={{
                latitude,
                longitude,
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
          </MapView>
       
          </>
          
        ) : (
         <Text></Text>
        )}
      </View>

    </View>
    </ScrollView>
    </ImageBackground>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  inp: {
    paddingHorizontal: 20,
    paddingVertical: 1,
  },
  containerr: {
    flex:1,

    height:null,
    width:null
   },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width-20,
    marginLeft:-10,

    height: Dimensions.get("window").height,
  },
});
