import React from 'react';
import {
  GiftedChat,
  InputToolbar,
  MessageText,
  Bubble,
} from 'react-native-gifted-chat';
import Constants from './constants';
import io from 'socket.io-client';
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
    this.socket = io(Constants.BACKEND_ENDPOINT, {
      transports: ['websocket', 'polling'],
    });
    this.state = {
      attendanceCardId: null,
      attendanceCardCreatedTime: null,
      timer: 10,
      timerId: null,
      isActiveAttendance: false,
      test: null,
      currentTime: new Date(),
      messages: [
        {
          _id: 'a@a.com',
          createdAt: new Date(),
          text: 'Ok',
          user: {
            _id: 'a@a.com',
            name: 'Soura Deep',
          },
        },
      ],
    };
    // this.tick = this.tick.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.createCard = this.createCard.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.getTimer = this.getTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
  }

  componentDidMount() {
    this.socket.emit('login', {
      name: this.props.route.params.userId,
      room: this.props.route.params.group.id,
    });
    this.socket.on('message', message => {
      this.addNewMessage(message);
    });
    setInterval(() => {
      this.setState({
        currentTime: new Date(),
        messages: [...this.state.messages],
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.socket.emit('logout', {
      name: this.props.route.params.userId,
      room: this.props.route.params.group.id,
    });
  }

  handleSend(newMessage = []) {
    const x = JSON.stringify(newMessage);
    this.setState({test: JSON.parse(x)});
    this.socket.emit('sendMessage', newMessage);
    this.setState({
      messages: GiftedChat.append(this.state.messages, newMessage),
    });
  }

  addNewMessage(newMessage = []) {
    this.setState({
      messages: GiftedChat.append(this.state.messages, newMessage.text),
    });
  }

  renderCard(isFinished) {
    console.log('isFinished', isFinished);
    return (
      <View
        style={{
          width: 150,
          height: 100,
          backgroundColor: 'white',
        }}>
        {isFinished == true ? (
          <View>
            <Text>Attendance Finished</Text>
          </View>
        ) : (
          <View>
            <Text>Attendance Going On!</Text>
            <Text>{this.getTimer()}</Text>
          </View>
        )}
      </View>
    );
  }

  displayTime(seconds) {
    const format = val => `0${Math.floor(val)}`.slice(-2);
    const hours = seconds / 3600;
    const minutes = (seconds % 3600) / 60;

    return [minutes, seconds % 60].map(format).join(':');
  }

  getTimer() {
    return this.displayTime(this.state.timer);
  }

  createCard() {
    const id = uuid.v4();
    const createdAt = new Date();
    this.setState({attendanceCardId: id, attendanceCardCreatedTime: createdAt});
    this.handleSend([
      {
        _id: id,
        createdAt: createdAt,
        customView: 'attendance',
        user: {_id: 'a@a.com'},
      },
    ]);
  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  renderAttendanceCard(message) {
    const createdTime = new Date(message.createdAt);
    const endTime = new Date(createdTime);
    endTime.setSeconds(createdTime.getSeconds() + this.state.timer);
    if (this.state.currentTime < endTime) {
      const left = endTime - this.state.currentTime;
      const time = this.millisToMinutesAndSeconds(left);
      return (
        <View>
          <Text>Attendance Going On!</Text>
          <Text>{time}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Attendance Finished</Text>
        </View>
      );
    }
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
                onPress={() => this.createCard()}>
                <Text>Hola</Text>
              </TouchableOpacity>
            </View>
          )}
          messages={this.state.messages}
          onSend={newMessage => this.handleSend(newMessage)}
          user={{_id: 'a@a.com'}}
          renderCustomView={hh => {
            if (hh.currentMessage.customView === 'attendance') {
              return (
                <View
                  style={{
                    width: 150,
                    height: 100,
                    backgroundColor: 'white',
                  }}>
                  {this.renderAttendanceCard(hh.currentMessage)}
                </View>
              );
            }
          }}
          renderBubble={hh => {
            return (
              <Bubble
                wrapperStyle={{
                  right: {
                    backgroundColor: 'grey',
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
