import React, { useState, useContext } from 'react'
import { View, Platform ,Text} from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import AuthContext from '../context/AuthContext'

export default function BookingScreen({ navigation }) {
  const [parkNumber, setParkNumber] = useState('')
  const [dateIn, setDateIn] = useState('')
  const [dateOut, setDateOut] = useState('')
  const { authTokens } = useContext(AuthContext)
  console.log(authTokens?.access)
  const [error, setError] = useState(false)
  const [errorMsg, seterrorMsg] = useState('')
  const inserData = () => {
    
    fetch('http://127.0.0.1:8000/reservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify({
        start_date: dateIn,
        finish_date: dateOut,
        parking_space_number: parkNumber,
      }),
    })
      .then(async (resp) => {let rep = await resp.json()
      console.log(rep)
      if(rep.success)
          {navigation.navigate('Booking')}
      else{
          setError(true);
          seterrorMsg(rep.message)
          } 
      })
      
      
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Book your parking</Header>
      {!error ? null : <Text>Parck place allready  Reserved</Text>}
      <input
        label="Date In"
        type="datetime-local"
        value={dateIn}
        onChange={(e) => setDateIn(e.target.value) }
      />
      <input
        label="Date Out"
        type="datetime-local"
        value={dateOut}
        onChange={(e) => setDateOut(e.target.value) }
      />
      <TextInput
        label="Parck number"
        returnKeyType="next"
        type="date"
        value={parkNumber}
        onChangeText={(text) => setParkNumber(text)}
      />

      <Button
        mode="contained"
        style={{ marginTop: 24 }}
        onPress={() => inserData()}
      >
        Submit
      </Button>
    </Background>
  )
}
