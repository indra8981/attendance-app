import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
class GroupListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          id: 1,
          name: 'Group 1',
        },
        {
          id: 2,
          name: 'Group 2',
        },
        {
          id: 3,
          name: 'Group 3',
        },
        {
          id: 4,
          name: 'Group 4',
        },
        {
          id: 1,
          name: 'Group 1',
        },
        {
          id: 2,
          name: 'Group 2',
        },
        {
          id: 3,
          name: 'Group 3',
        },
        {
          id: 4,
          name: 'Group 4',
        },
        {
          id: 1,
          name: 'Group 1',
        },
        {
          id: 2,
          name: 'Group 2',
        },
        {
          id: 3,
          name: 'Group 3',
        },
        {
          id: 4,
          name: 'Group 4',
        },
        {
          id: 1,
          name: 'Group 1',
        },
        {
          id: 2,
          name: 'Group 2',
        },
        {
          id: 3,
          name: 'Group 3',
        },
        {
          id: 4,
          name: 'Group 4',
        },
        {
          id: 1,
          name: 'Group 1',
        },
        {
          id: 2,
          name: 'Group 2',
        },
        {
          id: 3,
          name: 'Group 3',
        },
        {
          id: 4,
          name: 'Group 4',
        },
        {
          id: 1,
          name: 'Group 1',
        },
        {
          id: 2,
          name: 'Group 2',
        },
        {
          id: 3,
          name: 'Group 3',
        },
        {
          id: 4,
          name: 'Group 4',
        },
      ],
    };
  }
  componentDidMount() {
    // axios.get("").then(res=>{
    //   this.setState({groups: res.data});
    // })
    global.ID = 5;
  }

  renderList() {
    var lists = [];
    for (var i = 0; i < this.state.groups.length; i++) {
      const grp = this.state.groups[i];
      const component = (
        <TouchableOpacity
          onPress={() => this.navigation.navigate('chat')}
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
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
      </View>
    );
  }
}

export default GroupListScreen;
