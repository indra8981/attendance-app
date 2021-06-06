import React from 'react';
import {
  GiftedChat,
  InputToolbar,
  MessageText,
  Bubble,
} from 'react-native-gifted-chat';
import Constants from './constants';
import io from 'socket.io-client';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import uuid from 'uuid';
class chatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(Constants.BACKEND_ENDPOINT, {
      transports: ['websocket', 'polling'],
    });
    this.state = {
      isModalVisible : false,
      attendanceCardId: null,
      attendanceCardCreatedTime: null,
      timer: 10,
      timerId: null,
      isActiveAttendance: false,
      messages: [
        {
          _id: 'a@a.com',
          createdAt: new Date().getTime(),
          text: 'Ok',
          user: {
            _id: 'a@a.com',
            name: 'Soura Deep',
          },
        },
      ],
    };
    this.tick = this.tick.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.createCard = this.createCard.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.getTimer = this.getTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
  }


  ModalTester() {

    console.log("in modal")

    const f = !this.state.isModalVisible

    console.log(this.state.isModalVisible, f)
  
    this.setState({isModalVisible : f});

    console.log(this.state.isModalVisible)

  }

  componentDidMount() {
    this.socket.emit('login', {
      name: this.props.route.params.userId,
      room: this.props.route.params.group.id,
    });
    this.socket.on('message', message => {
      this.addNewMessage(message);
    });
  }

  componentWillUnmount() {
    this.socket.emit('logout', {
      name: this.props.route.params.userId,
      room: this.props.route.params.group.id,
    });
  }

  handleSend(newMessage = []) {
    this.setState({
      messages: GiftedChat.append(this.state.messages, newMessage),
    });
  }

  addNewMessage(newMessage = []) {
    this.setState({
      messages: GiftedChat.append(this.state.messages, newMessage),
    });
  }

  tick() {
    if (this.state.timer == 0) {
      const messages = this.state.messages;
      messages.shift();
      this.setState({timer: secondsLeft - 1, messages: messages});
      this.updateCard(true);
      clearInterval(this.state.timerId);
      this.setState({
        timer: 10,
        isActiveAttendance: false,
        attendanceCardId: null,
        attendanceCardCreatedTime: null,
      });
      return;
    }
    const secondsLeft = this.state.timer;

    const messages = this.state.messages;
    messages.shift();
    this.setState({timer: secondsLeft - 1, messages: messages});
    this.updateCard(false);
    console.log(this.state.timer);
  }

  getCard(id) {
    this.setState({isActiveAttendance: true});
    this.setState({timerId: setInterval(this.tick.bind(this), 1000)});
    return this.renderCard(false);
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
        customView: this.getCard(id),
        user: {_id: 'a@a.com'},
      },
    ]);
  }

  updateCard(isFinished = false) {
    const id = this.state.attendanceCardId;
    const createdAt = this.state.attendanceCardCreatedTime;
    this.handleSend([
      {
        _id: id,
        createdAt: createdAt,
        customView: this.renderCard(isFinished),
        user: {_id: 'a@a.com'},
      },
    ]);
  }


  render() {
    
    return (
      <View style={{flex: 1}}>

          <View style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={() => {this.setState({isModalVisible : false})}}> 
              <Modal isVisible={this.state.isModalVisible}>
              <View style = {{justifyContent: 'center', backgroundColor: "transparent", flex:1}} >
                <View style = {{backgroundColor: "#ffffff", margin: 50, maxHeight: 250, padding: 40, borderRadius: 20, flex: 1}}>

                    <Pressable style={styles.button} onPress={() => {this.createCard(), this.setState({isModalVisible : false})}}>
                      <Text style={styles.text}>Start Attendance</Text>
                    </Pressable>

                    <View style = {{marginTop: 20}}>
                      <Pressable style={styles.button}>
                        <Text style={styles.text}>FUTURE - 1</Text>
                      </Pressable>
                    </View>

                    <View style = {{marginTop: 20}}>
                      <Pressable style={styles.button}>
                        <Text style={styles.text}>FUTURE - 2</Text>
                      </Pressable>
                    </View>

                    <View style = {{marginTop: 20}}>
                      <Pressable style={styles.button} onPress={() => this.setState({isModalVisible : false})}> 
                        <Text style={styles.text}>CLOSE</Text>
                      </Pressable>
                    </View>

                </View>
              </View>
              </Modal>
            </TouchableWithoutFeedback>
          </View>

        <GiftedChat
          renderInputToolbar={props => (
            <View style={{flexDirection: 'row', flex: 1}}>
              <View style={{flex: 1}}>
                <InputToolbar {...props} />
              </View>
              <Icon name="paperclip" size={45} color="#bf1313" onPress={() => this.ModalTester()}/>
            </View>
          )}
          messages={this.state.messages}
          onSend={newMessage => this.handleSend(newMessage)}
          user={{_id: 'a@a.com'}}
          renderCustomView={hh => {
            return hh.currentMessage.customView;
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

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});


export default chatScreen;