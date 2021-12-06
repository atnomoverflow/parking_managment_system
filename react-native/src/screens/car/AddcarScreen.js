import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'

export default function AddcarScreen({ navigation }) {
  const [matricule, setMatricule] = useState("")
  const [model, setModel] = useState("")
  const [mark, setMark] = useState("")

  const inserData = () => {
    fetch('http://127.0.0.1:8000/car/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ matricule: matricule, model: model, mark: mark }),
    })
      .then((resp) => resp.json())
      .then((data) => navigation.navigate('Car'))
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Add Car</Header>
      <TextInput
        label="Matricule"
        returnKeyType="next"
        value={matricule.value}
        onChangeText={(text) => setMatricule(text)}
        error={!!matricule.error}
        errorText={matricule.error}
      />
      <TextInput
        label="Model"
        returnKeyType="next"
        value={model.value}
        onChangeText={(text) => setModel(text)}
        error={!!model.error}
        errorText={model.error}
      />
      <TextInput
        label="Mark"
        returnKeyType="next"
        value={mark.value}
        onChangeText={(text) => setMark({ value: text, error: '' })}
        error={!!mark.error}
        errorText={mark.error}
      />
      <Button mode="contained" style={{ marginTop: 24 }} onPress={() => inserData()}>
        Add
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
