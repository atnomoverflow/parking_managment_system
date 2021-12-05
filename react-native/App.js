import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-native-paper'

import { theme } from './src/core/theme'

import { AuthProvider } from './src/context/AuthContext'


export default function App() {
  
  return (
    <Provider theme={theme}>
      <AuthProvider/>
    </Provider>
  )
}
