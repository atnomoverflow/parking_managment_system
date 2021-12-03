import React, { useContext } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

// Screens
import HomeScreen from './HomeScreen'
import CarScreen from './CarScreen'
import ProfileScreen from './ProfileScreen'
import PaymentScreen from './PaymentScreen'
import LogsScreen from './LogsScreen'

//Screen names
const homeName = 'Home'
const carName = 'Car'
const logsName = 'Logs'
const paymentName = 'Payment'
const profileName = 'Profile'

const Tab = createMaterialBottomTabNavigator()

export default function Dashboard() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          let rn = route.name

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline'
          } else if (rn === carName) {
            iconName = focused ? 'car' : 'car-outline'
          } else if (rn === logsName) {
            iconName = focused ? 'list' : 'list-outline'
          } else if (rn === paymentName) {
            iconName = focused ? 'logo-usd' : 'logo-usd'
          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'grey',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: {
          position: 'absolute',
          height: 70,
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          borderRadius: 15,
        },
      }}
    >
      <Tab.Screen name={carName} component={CarScreen} />
      <Tab.Screen name={logsName} component={LogsScreen} />
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={paymentName} component={PaymentScreen} />
      <Tab.Screen name={profileName} component={ProfileScreen} />
    </Tab.Navigator>
  )
}
