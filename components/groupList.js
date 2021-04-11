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
import AsyncStorage from '@react-native-community/async-storage';
class GroupListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          id: 1,
          name: 'Group 1',
          type: 'group',
        },
        {
          id: 2,
          name: 'Group 2',
          type: 'classroom',
        },
        {
          id: 3,
          name: 'Group 3',
          type: 'group',
        },
        {
          id: 4,
          name: 'Group 4',
          type: 'classroom',
        },
      ],
      renderCreateButton: false
    };
  }
  async componentDidMount() {
    // axios.get("").then(res=>{
    //   this.setState({groups: res.data});
    // })
    global.ID = 5;
    var value = await AsyncStorage.getItem('loggedIn');
    value = JSON.parse(value);
    if (value['type'] < 2){
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
      if (this.props.type != grp.type) continue;
      const component = (
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('loggedIn');
          }}
          style={{
            borderBottomColor: 'grey',
            borderBottomWidth: 0.2,
            width: '100%',
            height: 50,
            backgroundColor: 'white',
          }}>
          <Text>{grp.name}</Text>
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
          onPress={this.buttonClickedHandler}
          style={styles.roundButton}>
          <View
            style={styles.bar1}
          />
          <View
            style={styles.bar2}
          />
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
    bottom: 40
  },
  bar1: {
    width: "100%",
    height: 5,
    backgroundColor: 'black',
    position: 'absolute',
    borderRadius: 10
  },
  bar2: {
    width: 5,
    height: "100%",
    backgroundColor: 'black',
    borderRadius: 10
  }
});
