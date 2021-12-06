import React, { useState } from 'react'
import { View, Platform } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'

export default function BookingScreen({ navigation }) {
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Reservation</Header>
      <TextInput label="DD/MM/AAAA" returnKeyType="next" />

      <Button mode="contained" style={{ marginTop: 24 }}>
        Submit
      </Button>
    </Background>
  )
}
