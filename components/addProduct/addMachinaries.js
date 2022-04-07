import { Alert, Dimensions, Image, ImageBackground, LogBox, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
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

const AddMachinaries = () => {
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
const [loadingg, setLoadingg] = useState(false)
const [changeButton, setChangeButton] = useState(false)
const [pinCode, setPinCode] = useState("")
const [modelNumber, setModelNumber] = useState("")
const [description, setDescription] = useState("")

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
    if(!namee || !price ||!city || !postalcode  ){
      alert("fill all fields")
    }
    try {

      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${user.token}`
        },
       
      }

      const {data} = await axios.post("https://kisaane.herokuapp.com/create",{ name: namee,
      price: price,
      location: city,
      pinCode: pinCode,
      image:imagename?imagename:"https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg",
   
    modelNumber:modelNumber,
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
       {/* style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "rgba(0,0,0,0.4)",
          alignItems:"center",
          position:"relative"
          },
        ]}
      >
      <ActivityIndicator style={{top:"50%"}} size="large" color="#fff" animating size="large" />*/}
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
   { /*>
      <View
        style={{
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
          shadowColor: "rgba(0,0,0,1)",
          shadowOpacity: 0.2,
          shadowOffset: { width: 4, height: 4 },
          shadowRadius: 5,
          overflow: "hidden",
        }}
      >
        <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
       
      </View>
      <Text
       
        style={{ paddingVertical: 10, paddingHorizontal: 10 }}
      >
       
      </Text>*/}
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

 
  // const takePhoto = async () => {
  //   let pickerResult = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //   });

  //   handleImagePicked(pickerResult);
  // };

  const pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });


   handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    
    
    try {
      setLoadingg(true)
      setUpload(true)
      
      if (!pickerResult.cancelled) {
       
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
        setImagename(uploadUrl)
        alert("Image uploaded successfully")
      
      }
      setLoadingg(false)
      setChangeButton(true)
  
    } catch (e) {
      setLoadingg(false)
      
      alert("Upload failed, sorry ");
    } finally {
      setUpload(false)
    }
  };


  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        
        reject(new TypeError("Network request failed"));
      };
    
      xhr.responseType = "blob";
   
      xhr.open("GET", uri, true);

      xhr.send(null);
  
    });

    const fileRef = ref(getStorage(), uuid.v4());
 
    const result = await uploadBytes(fileRef, blob);
  
   
   
  
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
        value={pinCode}
        keyboardType="numeric"
        onChangeText={text => setPinCode(text)}
      />

    
    <TextInput
    style={{ marginTop: 20 }}
    label="Vehicle Number"
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
    {changeButton ?(
      <Button mode="contained" style={{backgroundColor:"red"}} onPress={pickImage} disabled="true" >
      image uploaded
     </Button>
    ):(
      <Button mode="contained" style={{backgroundColor:"red"}} onPress={pickImage} loading={loadingg}>
         upload image (optional)
        </Button>
      
    )}  
      </View>

      <View style={{ marginTop: 20 }}>

      {!namee || !price || !postalcode || !city ||!modelNumber  ?(
        <Button mode="contained" onPress={() => addItem()}  style={{backgroundColor:"red"}} disabled="true">
        Add Product
      </Button>
      ):(
        <Button mode="contained" onPress={() => addItem()} disabled={loadingg}>
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
          <Text>lets begin</Text>
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

export default AddMachinaries;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  containerr: {
    flex:1,
  

    height:null,
    width:null
   },
  inp: {
    paddingHorizontal: 20,
    paddingVertical: 1,
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
