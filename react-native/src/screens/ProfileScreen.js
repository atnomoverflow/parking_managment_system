import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import AuthContext from '../context/AuthContext'

export default function ProfileScreen({ navigation }) {
    let { logoutUser } = useContext(AuthContext)
  const onLogoutPressed = () => {
    logoutUser()
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }
  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button mode="outlined" onPress={onLogoutPressed}>
        Logout
      </Button>
    </Background>
  )
  }
