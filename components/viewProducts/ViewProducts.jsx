import { Dimensions, FlatList, StyleSheet, Text, View ,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Card, Title, Paragraph } from "react-native-paper";
import Icon from 'react-native-vector-icons/Entypo'
import { Searchbar } from 'react-native-paper';

import {
  useFonts,

  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,

  Montserrat_700Bold,

  Montserrat_900Black,

} from '@expo-google-fonts/montserrat';
import AppLoading from "expo-app-loading";
import axios from "axios";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import { FarmerState } from "../context/ContextApi";

const ViewProducts = ({navigation}) => {
  const [gp, setGp] = useState([]);

  const [refresh, setRefresh] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [term, setTerm] = useState("")
  const [loading, setLoading] = useState(false)

  const {token} = FarmerState()

//   const getProduct = async()=>{
//     const token = await AsyncStorage.getItem("token")
    
//     const {data} = await axios.get("http://localhost:4000/getProduct",{
//       headers:{
//           "Content-Type":"application/json",
//           Authorization: `Bearer ${token}`,
//       },
//     })
  
//     setGp(data.product)
// }


    
     

// useEffect(() => {
//  getProduct()
// }, [])

const searchProduct =async ()=>{
  setLoading(true)
  // const token = await AsyncStorage.getItem("token")
 const {data} = await axios.get(`http://a9ef-2409-4043-240d-11af-12eb-297f-5b08-6f1b.ngrok.io/search?search=${searchData}`,{
      
      headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${token._W}`,
      }

  })
 setLoading(false)
  setGp(data)
  
  console.log(data)
 
   }
 



useEffect(() => {
  
 searchProduct()
}, [searchData])


  let [fontsLoaded] = useFonts({
    
    bold: Montserrat_300Light,
    bold1: Montserrat_400Regular,
     bold2:Montserrat_500Medium,
   
     regular:Montserrat_700Bold,
   
     bold3:Montserrat_900Black,
   });
 
   if(!fontsLoaded )
   {
     return <AppLoading/>;
   }

  // const data = [
  //   {
  //     name: "garvit",
  //     price: 234567,
  //     location: "location",
  //     pinCode: 34434,
  //   },
  //   {
  //     name: "jay",
  //     price: 8787,
  //     location: "Chandigarh",
  //     pinCode: 458441,
  //   },
  //   {
  //     name: "kapil",
  //     price: 8767,
  //     location: "aasam",
  //     pinCode: 458441,
  //   },
  // ];
const navigateToDetail=(item)=>{
 console.log(item)
  navigation.navigate("ProductDetail",{
    detail:item
  })
}

//  const renderData = ({item})=>{
//   return (
    
//     <View>
//     <TouchableOpacity onPress={k}>
//       <View style={styles.card}>
//         <View style={{display:"flex",flexDirection:"column"}}>
//           <View style={[styles.cardItem]}>
//             <Text style={[styles.productName,{alignSelf:"flex-end"},styles.rent]}> OnRent</Text>
//             <Text style={styles.productName}>   {item.name}</Text>
//           </View>
//           <View style={styles.cardItem}>
//             <Text style={styles.productName}>₹ {item.price}</Text>
//           </View>
//           <View style={styles.cardItem}>
//            <Text style={styles.productName}><Icon name="location-pin" size={14} color="black" /> {item.location}</Text>
//           </View>
//         </View>

//         <View style={[styles.cardItem,{alignSelf:"flex-end"}]}>
//           <Text style={styles.productName}>Pincode: {item.pinCode}</Text>
//         </View>
//       </View>
//       </TouchableOpacity>
//     </View>
  

//   );
//  }
     





  return (
    <SafeAreaView style={styles.container}>
    <Searchbar
    placeholder="Search"
    value = {searchData}
    onChangeText={(text)=>setSearchData(text)}

    style={{width:width-20,marginHorizontal:10}}
    // onEndEditing = {()=>{
    //   setSearchData(term)
    // }}
    
  />
  {loading ?(
    <View style={{display:"flex",justifyContent:"center",height:"90%"}}>
   <ActivityIndicator size="large" animating={true} color={Colors.blue800} />
   </View>):(
    <FlatList
    data={gp}
    
    renderItem={({item})=>(
      <TouchableOpacity onPress={()=>navigateToDetail(item)}>
      
      <View>
   
      <View style={styles.card}>
        <View style={{display:"flex",flexDirection:"column"}}>
          <View style={[styles.cardItem]}>
            <Text style={[styles.productName,{alignSelf:"flex-end"},styles.rent]}> OnRent</Text>
            <Text style={styles.productName}>   {item.name}</Text>
          </View>
          <View style={styles.cardItem}>
            <Text style={styles.productName}>₹ {item.price}</Text>
          </View>
          <View style={styles.cardItem}>
           <Text style={styles.productName}><Icon name="location-pin" size={14} color="black" /> {item.location}</Text>
          </View>
        </View>

        <View style={[styles.cardItem,{alignSelf:"flex-end"}]}>
          <Text style={styles.productName}>Pincode: {item.pinCode}</Text>
        </View>
      </View>
    
    </View>
      
      
      </TouchableOpacity>
    )}
    
    keyExtractor={(item) => item.name}
      showsHorizontalScrollIndicator={false}
    
    
  />
   )
   }
   
    </SafeAreaView>
  );
};

export default ViewProducts;
const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 35,
    paddingTop: 5,
    width: width - 20,
    marginVertical: 10,
    marginHorizontal: 10,
    display:"flex",
    justifyContent:"space-between",
  
    elevation:15,
    shadowRadius:20
  },
  productName: {
    fontSize: 15,
    fontFamily:"regular"
  },
  cardItem: {
    marginTop:6
  },
  rent:{
    borderWidth:1,
    borderColor:"#cc614b",
    padding:2
  }
});
