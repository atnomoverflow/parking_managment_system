import React, { Component, useState , useEffect, useContext} from 'react';
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
import AuthContext from '../context/AuthContext';

export default function LogsScreen() {

 const [data, setData] = useState([
  ])
   const { authTokens } = useContext(AuthContext)
  useEffect(() => {
	fetch('http://127.0.0.1:8000/logs/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens?.access}`,
      }
    })
	.then((resp) => resp.json())
     .then(log => {setData(log)})},[])

    

 const renderItem = ({item}) => {
    var callIcon = "https://img.icons8.com/ios-glyphs/30/fa314a/circled-up.png";
    if(item.action == 'CheckIn') {
      callIcon = "https://img.icons8.com/color/452/low-importance--v1.png";
    }
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: "https://www.pngall.com/wp-content/uploads/2/Parking-Only-Sign.png" }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.action}</Text>
            </View>
            <View style={styles.end}>
              <Image style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} source={{uri:"https://img.icons8.com/fluency/48/fa314a/clock--v2.png"}}/>
              <Text style={styles.time}>{item.date} </Text>
            </View>
          </View>
          <Image style={[styles.icon, { marginRight: 50 }]} source={{uri: callIcon}}/>
        </View>
      </TouchableOpacity>
    );
  }

  
    return(
      <View style={{ flex: 1 }} >
        <FlatList 
         
          data={data}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={renderItem}/>
      </View>
    );
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
  icon:{
    height: 28,
    width: 28, 
  }
});