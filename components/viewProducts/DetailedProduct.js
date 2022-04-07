import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import AppLoading from "expo-app-loading";
import { TextInput } from "react-native-paper";
import * as Linking from "expo-linking";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const DetailedProduct = ({ navigation, route }) => {
  const { detail } = route.params;
  let [fontsLoaded] = useFonts({
    bold: Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,

    regular: Montserrat_700Bold,

    Montserrat_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const pressCall = (mobileNumber) => {
    const url = `tel://${mobileNumber}`;
    Linking.openURL(url);
  };

  return (
    <View style={{ display: "flex", justifyContent: "center", flex: 1 }}>
      <View style={styles.cardConatiner}>
        <Image style={styles.imageStyle} source={{ uri: detail.image }} />

        <View style={styles.infoStyle}>
          <Text style={styles.nameStyle}>{detail.name}</Text>

          <Text style={styles.desc}>{detail.desc}</Text>
          <View style={{ alignSelf: "flex-end", marginTop: -25 }}>
            <Text style={[styles.desc, {}]}>Rs {detail.price}/hr</Text>
          </View>

          <View style={{ alignSelf: "flex-start" }}>
            <Text style={[styles.desc, {}]}>{detail.location}</Text>
          </View>

          <View style={{ alignSelf: "flex-end", marginTop: -25 }}>
            <TouchableOpacity onPress={() => pressCall()}>
              <Text style={[styles.texts, styles.t]}>
                <TextInput.Icon name="cellphone" /> 7987280833
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ alignSelf: "flex-start" }}>
            <Text style={[styles.desc, {}]}>{detail.pinCode}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailedProduct;
const deviceWidth = Math.round(Dimensions.get("window").width);
const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,

    resizeMode: "center",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    width: deviceWidth - 20,
    marginLeft: 10,
  },
  texts: {
    fontFamily: "regular",
  },
  product: {
    width: deviceWidth - 20,
    marginLeft: 10,
    paddingVertical: 0,
  },
  call: {
    width: deviceWidth - 20,
  },
  t: {
    color: "green",
  },
  card: {
    borderRadius: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 19,

    width: deviceWidth - 20,
    marginLeft: 10,
    marginTop: 10,
    height: 300,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  cardConatiner: {
    width: deviceWidth - 20,
    marginLeft: deviceWidth / 40,
    backgroundColor: "#ff7f50",
    height: 400,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
    marginTop: 10,
    display: "flex",
  },
  imageStyle: {
    height: 250,
    width: deviceWidth - 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.9,
  },
  nameStyle: {
    fontSize: 20,
    fontWeight: "800",
  },
  desc: {
    fontWeight: "200",
    marginTop: 10,
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
