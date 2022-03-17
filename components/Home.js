import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {useDispatch} from "react-redux"
import { logoutt } from "./store/actions/authentication";

const Home = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch()

  const boiler = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
const {data} = await axios.get("http://localhost:4000/f", {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    
      setEmail(data.email)
     
    } catch (error) {
      console.log(error.message)
      
    }
  };

  useEffect(() => {
    boiler();
  }, []);

  const navigateToCreateProduct = ()=>{
    navigation.navigate("Product")
  }

  const navigateToGetProducts = ()=>{
    navigation.navigate("ViewProducts")
  }

  // const {myName} = route.params

  const logout = () => {
    dispatch(logoutt())
    navigation.replace("Login")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.containerText}>Your Email is {email}</Text>
      <Button
        style={styles.buttonStyle}
        onPress={() => logout()}
        title="Logout"
      />
<TouchableOpacity onPress={()=>navigateToCreateProduct()}>
      <View style={styles.card}>
        <View>
          <View style={[styles.card, styles.shadowProp]}>
            <Text style={styles.heading}>
              Create Product
            </Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigateToGetProducts()}>
      <View style={styles.card}>
        <View>
          <View style={[styles.card, styles.shadowProp]}>
            <Text style={styles.heading}>
              View Products
            </Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    borderColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 25,
    width: "100%",
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  containerText: {
    fontSize: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 1,
  },
  mainHeader: {
    fontSize: 25,
    color: "#344055",
    fontWeight: "500",
    paddingTop: 20,
    paddingBottom: 15,
    textTransform: "capitalize",
    fontFamily: "bold",
  },
  description: {
    fontSize: 20,
    color: "#7d7d7d",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,
    fontFamily: "regular",
  },
  inputcontainer: {
    marginTop: 20,
  },
  labels: {
    fontSize: 18,
    color: "#7d7d7d",
    marginTop: 10,
    marginBottom: 5,
    lineHeight: 25,
    fontFamily: "regular",
  },
  inputStyles: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontFamily: "regular",
    fontSize: 18,
    borderColor: "rgba(0,0,0,0.3)",
  },
  buttonStyle: {
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 5,
    top: 15,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 30,
  },
  wrapperText: {
    paddingHorizontal: 10,
  },
  buttontext: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
});
