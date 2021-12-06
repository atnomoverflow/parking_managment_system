import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logoprofile() {
  return (
    
    <Image style={styles.image} source={{uri: "https://bootdey.com/img/Content/avatar/avatar4.png"}} />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})
