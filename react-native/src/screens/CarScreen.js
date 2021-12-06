import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class CarScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          id: 1,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/6/65/Circle-icons-car.svg',
          model: '2020',
          matricule: '210 TUN 1323',
          mark: 'Mercedes',
        },
        {
          id: 2,
          image:
            'https://upload.wikimedia.org/wikipedia/commons/6/65/Circle-icons-car.svg',
          model: '2013',
          matricule: '134 TUN 4324',
          mark: 'Golf',
        },
      ],
    }
  }

  renderGroupMembers = (group) => {
    if (group.members) {
      return (
        <View style={styles.groupMembersContent}>
          {group.members.map((prop, key) => {
            return (
              <Image
                key={key}
                style={styles.memberImage}
                source={{ uri: prop }}
              />
            )
          })}
        </View>
      )
    }
    return null
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />
          }}
          keyExtractor={(item) => {
            return item.id
          }}
          renderItem={(item) => {
            const Group = item.item
            let mainContentStyle
            if (Group.attachment) {
              mainContentStyle = styles.mainContent
            }
            return (
              <View style={styles.container}>
                <Image source={{ uri: Group.image }} style={styles.avatar} />
                <View style={styles.content}>
                  <View style={mainContentStyle}>
                    <View style={styles.text}>
                      <Text style={styles.groupName}>{Group.model}</Text>
                    </View>
                    <Text style={styles.countMembers}>
                      Matricule: {Group.matricule}
                    </Text>
                    <Text style={styles.timeAgo}>Mark : {Group.mark}</Text>
                    {this.renderGroupMembers(Group)}
                  </View>
                </View>
                <Ionicons
                  name="settings-outline"
                  size={25}
                  color="#041026"
                  onPress={() => this.props.navigation.navigate('Updatecar')}
                />
                <Ionicons
                  name="trash-outline"
                  size={25}
                  color="red"
                  onPress={() => this.props.navigation.navigate('Addcar')}
                />
              </View>
            )
          }}
        />
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Addcar')}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="add" color="white" size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight: 4,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  countMembers: {
    color: '#20B2AA',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  groupName: {
    fontSize: 23,
    color: '#1E90FF',
  },
  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
  footer: {
    position: 'relative',
    float: 'right',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(52, 52, 52, alpha)',
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
