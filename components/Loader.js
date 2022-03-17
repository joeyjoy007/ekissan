import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator,Colors } from 'react-native-paper'

const Loader = () => {
  return (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <ActivityIndicator size="large" animating={true} color={Colors.red800} />
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})