// import { StyleSheet, Text, View,Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native'
// import React, { useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'


// const Async = () => {
// const [data, setData] = useState("")
// const [getData, setGetData] = useState("")
        
// const addData =async ()=>{
//     try {
//         await AsyncStorage.setItem('name', data)
//         Alert.alert("data added")
//         await gData()
//         setData("")
//     } catch (error) {
//         console.log(err.message)
//     }
// }

// const gData = async()=>{
//     try {
//        const d= await AsyncStorage.getItem("name")
//         setGetData(d)
//     } catch (error) {
//         console.log(error.message)
//     }
// }

//   return (
//     <View>
//       <TextInput style={styles.inputBox} value={data} onChangeText={(value)=>setData(value)} />
//       <TouchableOpacity style={styles.addbutton} onPress={()=>addData()}  >
//      <Text style={{color:"white"}}>Add</Text>
//       </TouchableOpacity>
//       <Text> your data is{getData}</Text>
      
//     </View>
//   )
// }

// export default Async

// const {width} = Dimensions.get("screen")
// const styles = StyleSheet.create({
// inputBox:{
//     borderWidth:1,
//     borderColor:"black",
//     marginVertical:10,
//     marginHorizontal:8
// },
// addbutton:{
//     width:width-20,
//     backgroundColor:"blue",
//     marginHorizontal:10,
//     alignItems:"center",
//     padding:10

// }
// })