import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

export default class LogsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calls: [
        {id:1,  name: "CHECKOUT",   date:"12 jan", time:'11:14 am', in:false, image:"https://www.pngall.com/wp-content/uploads/2/Parking-Only-Sign.png"},
        {id:2,  name: "CHECKIN",  date:"12 jul", time:'15:58 am', in:true, image:"https://www.pngall.com/wp-content/uploads/2/Parking-Only-Sign.png"} ,
        {id:3,  name: "CHECKOUT", date:"12 aug", time:'12:45 am', in:false,  image:"https://www.pngall.com/wp-content/uploads/2/Parking-Only-Sign.png"} ,
        {id:4,  name: "CHECKIN", date:"12 feb", time:'08:32 am', in:true, image:"https://www.pngall.com/wp-content/uploads/2/Parking-Only-Sign.png"} ,
        {id:5,  name: "CHECKOUT",   date:"12 oct", time:'07:45 am', in:false,  image:"https://www.pngall.com/wp-content/uploads/2/Parking-Only-Sign.png"} ,
        {id:6,  name: "CHECKIN",   date:"12 jan", time:'09:54 am', in:true, image:"https://www.pngall.com/wp-content/uploads/2/Parking-Only-Sign.png"} ,
      ]
    };
  }

  renderItem = ({item}) => {
    var callIcon = "https://img.icons8.com/ios-glyphs/30/fa314a/circled-up.png";
    if(item.in == true) {
      callIcon = "https://img.icons8.com/color/452/low-importance--v1.png";
    }
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.name}</Text>
            </View>
            <View style={styles.end}>
              <Image style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} source={{uri:"https://img.icons8.com/fluency/48/fa314a/clock--v2.png"}}/>
              <Text style={styles.time}>{item.date} {item.time}</Text>
            </View>
          </View>
          <Image style={[styles.icon, { marginRight: 50 }]} source={{uri: callIcon}}/>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return(
      <View style={{ flex: 1 }} >
        <FlatList 
          extraData={this.state}
          data={this.state.calls}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>
      </View>
    );
  }
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