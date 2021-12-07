import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Button from '../../components/Button'
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton'
import { theme } from '../../core/theme'
import AuthContext from '../../context/AuthContext'

export default function UpdatecarScreen(props,{ navigation }) {
  const data = props.route.params.data ;
  const [matricule, setMatricule] = useState(data.matricule)
  const [model, setModel] = useState(data.model)
  const [mark, setMark] = useState(data.mark)
  const [id, setId] = useState(data.id)
 

const {authTokens} = useContext(AuthContext)
  console.log(authTokens?.access)
  const updateData = (id) => {
    console.log({matricule,model,mark})
    fetch(`http://127.0.0.1:8000/car/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify({matricule: matricule, model: model, mark: mark }),
    })
      .then((resp) => resp.json())
      .then((data) => props.navigation.navigate('Car'))
     
  }




  return (
    <Background>
      <BackButton/>
      <Logo />
      <Header>Update Car</Header>
      <TextInput
        label="Matricule"
        returnKeyType="next"
        value={matricule}
         onChangeText={(text) => setMatricule(text)}

      />
      <TextInput
        label="Model"
        returnKeyType="next"
        value={model}
        onChangeText={(text) => setModel(text)}
     
      />
      <TextInput
        label="Mark"
        returnKeyType="next"
        value={mark}
        onChangeText={(text) => setMark(text)}
      
      />
      <Button mode="contained" style={{ marginTop: 24 }} onPress={() => updateData(id)}>
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
