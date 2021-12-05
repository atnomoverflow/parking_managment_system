import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import AuthContext from '../context/AuthContext'

export default function HomeScreen({ navigation }) {
    
  return (
    <Background>
      <Logo />
      <Header>welcome back !</Header>
      
      
    </Background>
  )
  }
