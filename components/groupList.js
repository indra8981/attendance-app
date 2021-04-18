import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Icon,
} from 'react-native';
import axios from './axios';
import Geolocation from '@react-native-community/geolocation';

import AsyncStorage from '@react-native-community/async-storage';
class GroupListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      renderCreateButton: false,
    };
  }
  async componentDidMount() {
    Geolocation.getCurrentPosition(info => console.log(info));
    Geolocation.watchPosition(
      info => console.log('watch', info),
      () => {},
      {
        enableHighAccuracy: true,
      },
    );
    var value = await AsyncStorage.getItem('loggedIn');
    value = JSON.parse(value);
    const userId = value['email'];
    axios
      .get(`/group/listGroup?userId=${userId}`)
      .then(res => {
        this.setState({groups: res.data.data});
      })
      .catch(err => {
        console.log(err);
      });
    global.ID = 5;
    if (value['userType'] < 2) {
      this.setState({renderCreateButton: true});
    }
  }

  buttonClickedHandler() {
    this.props.navigation.navigate('groupCreate');
  }

  renderList() {
    var lists = [];
    for (var i = 0; i < this.state.groups.length; i++) {
      const grp = this.state.groups[i];
      if (this.props.type != grp.groupType) continue;
      const component = (
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('loggedIn');
          }}
          key={grp.Id}
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
            width: '100%',
            height: 50,
            backgroundColor: 'white',
          }}>
          <Text>{grp.groupName}</Text>
        </TouchableOpacity>
      );
      lists.push(component);
    }
    return lists;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView>{this.renderList()}</ScrollView>
        <TouchableOpacity
          onPress={() => this.buttonClickedHandler()}
          style={styles.roundButton}>
          <View style={styles.bar1} />
          <View style={styles.bar2} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default GroupListScreen;

const styles = StyleSheet.create({
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
    position: 'absolute',
    right: 20,
    bottom: 40,
  },
  bar1: {
    width: '100%',
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    borderRadius: 10,
  },
  bar2: {
    width: 5,
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
});
