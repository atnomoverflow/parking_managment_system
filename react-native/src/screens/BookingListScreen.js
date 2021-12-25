import React, { Component, useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AuthContext from '../context/AuthContext'

export default function BookingListScreen({ navigation }) {
  const [data, setData] = useState([])
  const { authTokens } = useContext(AuthContext)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/reservationlist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authTokens?.access}`,
      },
    })
      .then((resp) => resp.json())
      .then((log) => {
        setData(log)
      })
  }, [data])

  const renderItem = ({ item }) => {
    var callIcon = 'https://img.icons8.com/ios-glyphs/30/fa314a/circled-up.png'

    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image
            source={{
              uri: 'https://www.pngall.com/wp-content/uploads/2/Parking-Only-Sign.png',
            }}
            style={styles.pic}
          />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                Park Space Number : {item.parking_space_number}
              </Text>
            </View>
            <View style={styles.end}>
              <Image
                style={[
                  styles.icon,
                  { marginLeft: 15, marginRight: 5, width: 14, height: 14 },
                ]}
                source={{
                  uri: 'https://img.icons8.com/fluency/48/fa314a/clock--v2.png',
                }}
              />
              <Text style={styles.time}>
                {item.start_date} - {item.finish_date}
              </Text>
            </View>
          </View>
          <Image
            style={[styles.icon, { marginRight: 50 }]}
            source={{
              uri: 'https://img.icons8.com/fluency/48/fa314a/clock--v2.png',
            }}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => {
            return item.id
          }}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('BookingPark')}>
          <View style={styles.iconContainer}>
            <Ionicons name="add" color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 270,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,
  },
  icon: {
    height: 28,
    width: 28,
  },
  footer: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 20,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#20e36b',
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
