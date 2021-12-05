import React from 'react'
import { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  CarScreen,
  HomeScreen,
  ProfileScreen,
  LogsScreen,
  BookingScreen,
  AddcarScreen,
  UpdatecarScreen,
  EditProfileScreen,
} from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { set } from 'react-native-reanimated'
const AuthContext = createContext()

export default AuthContext
const Stack = createStackNavigator()

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  )
  let [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwt_decode(localStorage.getItem('authTokens'))
      : null
  )
  let [loading, setLoading] = useState(true)

  let loginUser = async ({ username, password }) => {
    let response = await fetch('http://127.0.0.1:8000/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    let data = await response.json()
    console.log(data)
    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      return { result: true, error: data }
    } else {
      return { result: false, error: data }
    }
  }

  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
  }

  // let updateToken = async ()=> {

  //     let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
  //         method:'POST',
  //         headers:{
  //             'Content-Type':'application/json'
  //         },
  //         body:JSON.stringify({'refresh':authTokens?.refresh})
  //     })

  //     let data = await response.json()

  //     if (response.status === 200){
  //         setAuthTokens(data)
  //         setUser(jwt_decode(data.access))
  //         localStorage.setItem('authTokens', JSON.stringify(data))
  //     }else{
  //         logoutUser()
  //     }

  //     if(loading){
  //         setLoading(false)
  //     }
  // }

  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access))
    }
    setLoading(false)
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
      <NavigationContainer>
        {authTokens != null ? (
          <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            {/* <Stack.Screen name="Car" component={CarScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Logs" component={LogsScreen} />
              <Stack.Screen name="Booking" component={BookingScreen} />
              <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="Addcar" component={AddcarScreen} />
            <Stack.Screen name="Updatecar" component={UpdatecarScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
