import React from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from './axios';

class GroupEditScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupDescription: '',
      groupType: 0,
      alreadyInvitedUsers: [],
      inviteUsers: '',
      additionalInfo: '',
    };
  }

  async componentDidMount() {
    console.log(this.props.route.params.group, this.props.route.params.group.groupName);
    this.props.navigation.setOptions({
      title: 'Edit group: ' + this.props.route.params.group.groupName
    });
    groupDetails = await axios.get(
      `/group/getGroupDetails?groupId=${this.props.route.params.group.id}`,
    );
    console.log(groupDetails.data.groupDetails.invitedUsers)
    this.setState({
      groupName: this.props.route.params.group.groupName,
      groupDescription: this.props.route.params.group.groupDescription,
      groupType: this.props.route.params.group.groupType,
      alreadyInvitedUsers: groupDetails.data.groupDetails.invitedUsers,
      additionalInfo: this.props.route.params.group.additionalInfo,
    });
  }

  async handleSubmit() {
    var value = await AsyncStorage.getItem('loggedIn');
    value = JSON.parse(value);
    const userId = value['email'];
    console.log(this.state);
    const group = {
      groupName: this.state.groupName,
      groupDescription: this.state.groupDescription,
      groupType: this.state.groupType,
      createdByUser: userId,
      additionalInfo: this.state.additionalInfo,
    };
    console.log("Hola", group);
    await axios.post(`/group/updateGroupDetails`, group).then(response => {
      console.log("Hola")
    });
    const inviteUsers = {
      emails: this.state.invitedEmails,
      groupId: this.props.route.params.group.id,
    };
    await axios.post('/group/inviteUsers', inviteUsers).then(response => {
      console.log(response.data);
    });
    this.props.navigation.navigate('groupTabs');
    Alert.alert('Group created successfully !');
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
            placeholder="Group type"
            selectedValue={this.state.groupType}
            onValueChange={itemValue => this.setState({groupType: itemValue})}>
            <Picker.Item label="General Group" value={0} />
            <Picker.Item label="Classroom" value={1} />
          </Picker>
          <TextInput
            placeholder="Already Invited Users"
            multiline={true}
            onChangeText={alreadyInvitedUsers =>
              this.setState({alreadyInvitedUsers})
            }
            value={`${this.state.alreadyInvitedUsers}`}
            editable={false}
          />
          <TextInput
            placeholder="Invite More Users"
            multiline={true}
            numberOfLines={10}
            onChangeText={inviteUsers => this.setState({inviteUsers})}
            value={this.state.inviteUsers}
          />
          <TextInput
            placeholder="Additional Information"
            multiline={true}
            numberOfLines={10}
            onChangeText={additionalInfo => this.setState({additionalInfo})}
            value={this.state.additionalInfo}
          />
          <Button
            title="Update Group Information"
            onPress={async () => {
              await this.handleSubmit();
            }}
          />
        </View>
      </View>
    );
  }
}

export default GroupEditScreen;
