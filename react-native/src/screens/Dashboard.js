import React, { useContext } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

// Screens
import HomeScreen from './HomeScreen'
import CarScreen from './CarScreen'
import ProfileScreen from './ProfileScreen'
import LogsScreen from './LogsScreen'
import BookingListScreen from './BookingListScreen'


//Screen names
const homeName = 'Home'
const carName = 'Car'
const logsName = 'Logs'
const bookingName = 'Booking'
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
          } else if (rn === bookingName) {
            iconName = focused ? 'calendar' : 'calendar-outline'
          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person-outline'
          }
          size = 25

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
      })}
      barStyle={{
        position: 'absolute',
        bottom: 15,
        left: 20,
        right: 20,
        borderRadius: 30,
        backgroundColor: '#02acc9',
        overflow: 'hidden',
      }}
    >
      <Tab.Screen name={carName} component={CarScreen} />
      <Tab.Screen name={logsName} component={LogsScreen} />
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={bookingName} component={BookingListScreen} />
      <Tab.Screen name={profileName} component={ProfileScreen} />
    </Tab.Navigator>
  )
}
