import React, { useContext,useState } from 'react';
import { View, Text } from 'react-native';
import Background from '../components/Background'
import Logoprofile from '../components/Logoprofile'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import useAxios from '../utils/useAxios'
import AuthContext from '../context/AuthContext'

export default function ProfileScreen({ navigation }) {
  let { logoutUser } = useContext(AuthContext)
  let api = useAxios()
  const [Username, setUsername] = useState("Username")
  const [Email, setEmail] = useState("Email")
  const getUserProfile = async () => {
    let userProfileRequest = await api.get("/user")
      .then(
        (responce) => {
          console.log(responce)
          setUsername(responce.data.user.username)
          setEmail(responce.data.user.email)
        }
    )
    
    //console.log(userProfileResponce)
  }
  const onLogoutPressed = () => {
    logoutUser()
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    })
  }
  let profileDetail = getUserProfile()
  return (
    <Background>
      <Logoprofile />
      <Header>{Username}</Header>
      <Paragraph>
      {Email}
      </Paragraph>
      <Button mode="outlined" onPress={() => navigation.navigate('EditProfile')}>
        Edit Profile
      </Button>
      <Button mode="outlined" onPress={onLogoutPressed}>
        Logout
      </Button>
    </Background>
  )
  }
