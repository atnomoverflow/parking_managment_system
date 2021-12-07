import React, { useState , useContext} from 'react'
import { View, Platform } from 'react-native'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import AuthContext from '../context/AuthContext'
import DatePicker from 'react-native-datepicker'



export default function BookingScreen({ navigation }) {
  const [open, setOpen] = useState(false)
const [parkNumber, setParkNumber] = useState("")
  const [dateIn, setDateIn] = useState("")
  const [dateOut, setDateOut] = useState("")
  const {authTokens} = useContext(AuthContext)
  console.log(authTokens?.access)
  const inserData = () => {
    console.log({matricule,model,mark})
    fetch('http://127.0.0.1:8000/reservation/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify({ dateIn: dateIn, dateOut: dateOut, parkNumber: parkNumber }),
    })
      .then((resp) => resp.json())
      .then((data) => navigation.navigate('Booking'))
     
  }



  return (
    <DatePicker
        style={{width: 200}}
        date={dateIn}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {setDateIn(date)}}
      />
  )
}
