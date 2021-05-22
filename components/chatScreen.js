import React from 'react';
import {
  GiftedChat,
  InputToolbar,
  MessageText,
  Bubble,
} from 'react-native-gifted-chat';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import uuid from 'uuid';
class chatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 1,
          createdAt: new Date().getTime(),
          text: 'Ok',
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
      <View style={{flex: 1}}>
        <GiftedChat
          renderInputToolbar={props => (
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flex: 1}}>
                <InputToolbar {...props} />
              </View>
              <TouchableOpacity
                style={{backgroundColor: 'yellow'}}
                onPress={() =>
                  this.handleSend([
                    {
                      _id: uuid.v4(),
                      createdAt: new Date(),
                      customView: (
                        <View
                          style={{
                            width: 60,
                            height: 60,
                            backgroundColor: 'black',
                          }}
                        />
                      ),
                      user: {_id: 1},
                    },
                  ])
                }>
                <Text>Hola</Text>
              </TouchableOpacity>
            </View>
          )}
          messages={this.state.messages}
          onSend={newMessage => this.handleSend(newMessage)}
          user={{_id: 1}}
          renderCustomView={hh => {
            console.log('custom', typeof hh.currentMessage.customView);
            return hh.currentMessage.customView;
          }}
          renderBubble={hh => {
            console.log(hh);
            return (
              <Bubble
                wrapperStyle={{
                  right: {
                    backgroundColor: 'pink',
                  },
                }}
                {...hh}
              />
            );
          }}
        />

        {/* <MessageText currentMessage={{text: 'Hello'}} /> */}
      </View>
    );
  }
}
export default chatScreen;
