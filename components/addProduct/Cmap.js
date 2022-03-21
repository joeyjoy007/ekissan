import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as Location from "expo-location";
import MapView, { Callout, Circle, Marker,PROVIDER_GOOGLE } from "react-native-maps";
import { IconButton, Colors, TextInput } from "react-native-paper";

const Cmap = () => {

    const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [start, setStart] = useState(false);
  const [city, setCity] = useState("")
  const [postalcode, setPostalcode] = useState("")
  const [region, setRegion] = useState("")

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
  return (
    <View>
    <TextInput
    style={{ marginTop: 20 }}
    label="Location"
    value={city}
    // onChangeText={text => setLocation(text)}
    right={<TextInput.Icon name="axis-arrow" onPress={getLocation} />}
  />
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
  )
}

export default Cmap

const styles = StyleSheet.create({
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
})