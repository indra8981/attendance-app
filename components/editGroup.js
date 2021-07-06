import React from 'react';
import {View, TextInput, Button, Alert, ScrollView} from 'react-native';
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
    console.log(
      this.props.route.params.group,
      this.props.route.params.group.groupName,
    );
    this.props.navigation.setOptions({
      title: 'Edit group: ' + this.props.route.params.group.groupName,
    });
    groupDetails = await axios.get(
      `/group/getGroupDetails?groupId=${this.props.route.params.group.id}`,
    );

    this.setState({
      groupName: groupDetails.data.groupDetails.groupName,
      groupDescription: groupDetails.data.groupDetails.groupDescription,
      groupType: groupDetails.data.groupDetails.groupType,
      alreadyInvitedUsers: groupDetails.data.groupDetails.invitedUsers,
      additionalInfo: groupDetails.data.groupDetails.additionalInfo,
    });
  }

  async handleSubmit() {
    var value = await AsyncStorage.getItem('loggedIn');
    value = JSON.parse(value);
    const userId = value['email'];

    const group = {
      groupId: this.props.route.params.group.id,
      groupName: this.state.groupName,
      groupDescription: this.state.groupDescription,
      groupType: this.state.groupType,
      createdByUser: userId,
      additionalInfo: this.state.additionalInfo,
    };

    await axios.post(`/group/updateGroupDetails`, group);
    const inviteUsers = {
      emails: `${this.state.inviteUsers}`,
      groupId: this.props.route.params.group.id,
    };
    await axios.post('/group/inviteUsers', inviteUsers);

    this.props.navigation.navigate('groupTabs');
    Alert.alert('Group Editted successfully !');
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
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
      </ScrollView>
    );
  }
}

export default GroupEditScreen;
