import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
class ClassRoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {
          id: 1,
          name: 'Class 1',
        },
        {
          id: 2,
          name: 'Class 2',
        },
        {
          id: 3,
          name: 'Class 3',
        },
        {
          id: 4,
          name: 'Class 4',
        },
      ],
    };
  }
  componentDidMount() {
    // axios.get("").then(res=>{
    //   this.setState({groups: res.data});
    // })
    console.log('classroom', global.ID);
  }

  renderList() {
    var lists = [];
    for (var i = 0; i < this.state.groups.length; i++) {
      const grp = this.state.groups[i];
      const component = (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('login')}
          key={grp.id}
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>{this.renderList()}</ScrollView>
      </View>
    );
  }
}

export default ClassRoomList;
