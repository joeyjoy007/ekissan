import { Alert, Dimensions, Image, LogBox, Platform, StyleSheet, Text, View } from "react-native";
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
import { IconButton, Colors } from "react-native-paper";
import { FarmerState } from "../context/ContextApi";



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
  const [location, setLocation] = useState("");
  const [pinCode, setPinCode] = useState();
  const [visible, setVisible] = React.useState(false);
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [start, setStart] = useState(false);
  const [image, setImage] = useState(null)
const [upload, setUpload] = useState(false)
const [imagename, setImagename] = useState("")

const {token} = FarmerState()

const permission = async()=>{
  if (Platform.OS !== "web") {
    const {
      status,
    } =await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  }
}

  useEffect(() => {
  permission()
  }, [])


 

  const addItem = async () => {
    // const token = await AsyncStorage.getItem("token");
    // console.log("TOKEN", token);
    await fetch(
      "http://a9ef-2409-4043-240d-11af-12eb-297f-5b08-6f1b.ngrok.io/createVehicle",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token._W,
        },
        body: JSON.stringify({
          name: namee,
          price: price,
          location: city,
          pinCode: postalcode,
          image:imagename
        }),
      }
    );
    Alert.alert("Item Added", `${namee} added`);
  };




const maybeRenderUploadingOverlay = () => {
  if (upload) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "rgba(0,0,0,0.4)",
          alignItems:"center",
          position:"relative"
          },
        ]}
      >
        <ActivityIndicator style={{top:"50%"}} size="large" color="#fff" animating size="large" />
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
      allowsEditing: true,
      aspect: [4, 3],
    });


   handleImagePicked(pickerResult);
  };

  const handleImagePicked = async (pickerResult) => {
    try {

      setUpload(true)
      Alert.alert("tried")
      if (!pickerResult.cancelled) {
       
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        setImage(uploadUrl);
        setImagename(uploadUrl)
      
      }
      alert("Image upload successfully");
    } catch (e) {
      
      alert("Upload failed, sorry :(");
    } finally {
      setUpload(false)
    }
  };


  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
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
    <View style={styles.input}>
      <TextInput
        style={styles.inp}
        label="Product Name"
        value={namee}
        onChangeText={(text) => setNamee(text)}
      />
      <View>
        <Text>{start ? <Text>started</Text> : ""}</Text>
      </View>
      <TextInput
        style={{ marginTop: 20 }}
        label="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={(text) => setPrice(text)}
      />
      {!!image && (
      Alert.alert("Image added")
      )}

     
      
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
        value={postalcode}
        keyboardType="numeric"
        // onChangeText={text => setPinCode(text)}
      />
      <View style={{ marginTop: 20 }}>
        <Button mode="contained" onPress={() => addItem()}>
          Add Product
        </Button>
        <Button mode="contained" onPress={pickImage}>
         upload image
        </Button>
        

       
     
      

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
          <Text>expo isuue</Text>
        )}
      </View>
      <Text>This issue</Text>
    </View>
  );
};

export default AddMachinaries;

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
