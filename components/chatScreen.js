import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

class chatScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        messages : [{
            _id: 1,
            text: 'OKKK!',
            createdAt: new Date().getTime(),
            user: {
              _id: 2,
              name: 'Soura Deep'
            }
          }],
      };
    }

    handleSend(newMessage = []) {
        this.setState({messages: GiftedChat.append(this.state.messages, newMessage)});
    }

    render() {
        return (
            <GiftedChat
              messages={this.state.messages}
              onSend={newMessage => this.handleSend(newMessage)}
              user={{ _id: 1 }}
            />
          );
      }
}
export default chatScreen;