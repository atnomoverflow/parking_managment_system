import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logoprofile from '../components/Logoprofile'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'

export default function EditProfileScreen({ navigation }) {

  
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logoprofile />
      <Header>Edit Profile</Header>
      <TextInput
        label="UserName"
        returnKeyType="next"
       
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        
        secureTextEntry
      />
      <Button
        mode="contained"
        style={{ marginTop: 24 }}
      >
        Update
      </Button>
      
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
