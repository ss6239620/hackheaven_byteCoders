import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colorTheme } from '../constant'

export default function LinkUpoad() {
  return (
    <View style={{flex:1}}>
      <TouchableOpacity style={{ position: 'absolute', bottom: 30, right: 25,backgroundColor:colorTheme.primaryColor,borderRadius:50 }}>
        <MaterialIcons name="add" size={25} color={'black'} style={{padding:20}}/>
      </TouchableOpacity>
      <Text>LinkUpload</Text>
    </View>
  )
}

const styles = StyleSheet.create({})