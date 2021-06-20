import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from './axios';
class GroupCreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupDescription: '',
      groupType: 0,
      invitedEmails: '',
      additionalInfo: '',
    };
  }
  async componentDidMount() {
    await AsyncStorage.removeItem('loggedIn');
    // axios.get("").then(res=>{
    //   this.setState({groups: res.data});
    // })
    global.ID = 5;
  }

  async handleSubmit() {
    var value = await AsyncStorage.getItem('loggedIn');
    value = JSON.parse(value);
    const userId = value['email'];
    console.log(this.state);
    const group = {
      groupName: this.state.groupName,
      groupType: this.state.groupType,
      createdByUser: userId,
      additionalInfo: this.state.additionalInfo,
    };
    console.log(group);
    var groupId = -1;
    await axios.post('/group/createGroup', group).then(response => {
      console.log(response.data);
      groupId = response.data.insertId;
      console.log(groupId);
    });
    const inviteUsers = {
      emails: this.state.invitedEmails,
      groupId: groupId,
    };
    await axios.post('/group/inviteUsers', inviteUsers).then(response => {
      console.log(response.data);
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <TextInput
            placeholder="Name"
            onChangeText={groupName => this.setState({groupName})}
            value={this.state.groupName}
          />
          <TextInput
            placeholder="Description"
            onChangeText={groupDescription => this.setState({groupDescription})}
            value={this.state.groupDescription}
          />
          <Picker
            placeholder="Select group type"
            selectedValue={this.state.groupType}
            onValueChange={itemValue => this.setState({groupType: itemValue})}>
            <Picker.Item label="General Group" value={0} />
            <Picker.Item label="Classroom" value={1} />
          </Picker>
          <TextInput
            placeholder="Invited Emails"
            multiline={true}
            numberOfLines={10}
            onChangeText={invitedEmails => this.setState({invitedEmails})}
            value={this.state.invitedEmails}
          />
          <TextInput
            placeholder="Additional Information"
            multiline={true}
            numberOfLines={10}
            onChangeText={additionalInfo => this.setState({additionalInfo})}
            value={this.state.additionalInfo}
          />
          <Button
            title="Create"
            onPress={() => {
              this.handleSubmit();
            }}
          />
        </View>
      </View>
    );
  }
}

export default GroupCreateScreen;
