import React, { useState , useEffect} from 'react'
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
import useAxios from '../utils/useAxios'

export default function EditProfileScreen({ navigation }) {
  let api = useAxios()
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Username, setUsername] = useState("")
  const setUserProfile = async () => {
    await api.put("/updateprofile", {
      username: Username,
      password: Password,
      email: Email
    }).then(
        (responce) => console.log(responce)  
      ).catch(
        (error) => console.log(error)
      )
  }
  useEffect(() => {  
   api.get("/user")
      .then(
        (responce) => {
          console.log(responce)
          setUsername(responce.data.user.username)
          setEmail(responce.data.user.email)
        }
    )

  },[])

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logoprofile />
      <Header>Edit Profile</Header>
      <TextInput
        label="UserName"
        returnKeyType="next"
        value={Username}
        onChangeText={(text) => setUsername(text)}

      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={Email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={Password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button
        mode="contained"
        style={{ marginTop: 24 }}
        onPress={setUserProfile}
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
