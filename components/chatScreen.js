import React from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {StyleSheet, View, Text, Button, TextInput, Alert} from 'react-native';
class chatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 1,
          text: 'OKKK!',
          createdAt: new Date().getTime(),
          user: {
            _id: 2,
            name: 'Soura Deep',
          },
        },
      ],
    };
  }

  handleSend(newMessage = []) {
    console.log(newMessage);
    this.setState({
      messages: GiftedChat.append(this.state.messages, newMessage),
    });
  }

  render() {
    return (
      <GiftedChat
        renderInputToolbar={props => (
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <InputToolbar {...props} />
            </View>
            <View>
              <Text>Hola</Text>
            </View>
          </View>
        )}
        messages={this.state.messages}
        onSend={newMessage => this.handleSend(newMessage)}
        user={{_id: 1}}
      />
    );
  }
}
export default chatScreen;
