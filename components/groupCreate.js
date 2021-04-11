import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
class GroupCreateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
      groupDescription: '',
      groupType: "0",
      invitedEmails: '',
    };
  }
  componentDidMount() {
    // axios.get("").then(res=>{
    //   this.setState({groups: res.data});
    // })
    global.ID = 5;
  }

  handleSubmit() {
    console.log(this.state);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View>
          <TextInput
            placeholder="Name"
            onChangeText={(groupName) => this.setState({groupName})}
            value={this.state.groupName}
          />
          <TextInput
            placeholder="Description"
            onChangeText={(groupDescription) => this.setState({groupDescription})}
            value={this.state.groupDescription}
          />
          <Picker
            placeholder="Select group type"
            selectedValue={this.state.groupType}
            onValueChange={itemValue => this.setState({groupType: itemValue})}>
            <Picker.Item label="Classroom" value="0" />
            <Picker.Item label="Student" value="1" />
          </Picker>
          <TextInput
            placeholder="Invited Emails"
            multiline={true}
            numberOfLines={10}
            onChangeText={(invitedEmails) => this.setState({invitedEmails})}
            value={this.state.invitedEmails}
          />
          <Button 
            title="Create" 
            onPress={this.handleSubmit}
          />
        </View>
      </View>
    );
  }
}

export default GroupCreateScreen;
