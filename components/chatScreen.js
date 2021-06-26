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
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import axios from './axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import AWS from 'aws-sdk';
import DocumentPicker from 'react-native-document-picker';
import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from 'react-native-video-player';

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
class chatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(Constants.BACKEND_ENDPOINT, {
      transports: ['websocket', 'polling'],
    });
    this.state = {
      isModalVisible: false,
      user: null,
      groupType: null,
      userName: null,
      attendanceCardId: null,
      attendanceCardCreatedTime: null,
      timer: 10,
      timerId: null,
      isActiveAttendance: false,
      test: null,
      currentTime: new Date(),
      messages: [
        // {
        //   _id: '123456',
        //   createdAt: new Date(),
        //   text: 'Ok',
        //   user: {
        //     _id: 'a@a.com',
        //     name: 'Soura Deep',
        //   },
        //   image: 'http://192.168.31.61:9000/hola/test.jpg',
        //   // video: 'http://192.168.31.61:9000/hola/VID-20210501-WA0001.mp4',
        // },
      ],
    };
    // this.tick = this.tick.bind(this);
    this.renderCard = this.renderCard.bind(this);
    this.createCard = this.createCard.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.getTimer = this.getTimer.bind(this);
    this.displayTime = this.displayTime.bind(this);
  }

  ModalTester() {
    const f = !this.state.isModalVisible;

    console.log(this.state.isModalVisible, f);

    this.setState({isModalVisible: f});

    console.log(this.state.isModalVisible);
  }

  async componentDidMount() {
    let chats = await axios.get(
      `/chats?groupId=${this.props.route.params.group.id}`,
    );
    this.setState({
      user: this.props.route.params.userId,
      userName: this.props.route.params.userName,
      messages: chats.data.chats,
      groupType: this.props.route.params.group.groupType,
    });
    console.log('Hola: ', this.state);
    console.log(this.props.route.params.group);
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

  renderMessageVideo(props) {
    const {currentMessage} = props;
    console.log(props);
    var styles = StyleSheet.create({
      backgroundVideo: {
        height: 200,
        width: 200,
      },
    });
    return (
      <View style={{padding: 20}}>
        <Video
          source={{uri: currentMessage.video}}
          style={styles.backgroundVideo}
          resizeMode="contain"
          pictureInPicture={true}
          controls={true}
          paused={true}
        />
      </View>
    );
  }

  async sendImage() {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const fileToUpload = res;
      const data = new FormData();
      data.append('file_attachment', fileToUpload);
      let oo = await axios.post('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      });
      const id = uuidv4();
      const createdAt = new Date();
      this.handleSend([
        {
          _id: id,
          createdAt: createdAt,
          image: oo.data.url,
          user: {_id: this.state.user, name: this.state.userName},
        },
      ]);

      //Setting the state to show single file attributes
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  async sendVideo() {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      const fileToUpload = res;
      const data = new FormData();
      data.append('file_attachment', fileToUpload);
      let oo = await axios.post('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      });
      const id = uuidv4();
      const createdAt = new Date();
      this.handleSend([
        {
          _id: id,
          createdAt: createdAt,
          video: oo.data.url,
          user: {_id: this.state.user, name: this.state.userName},
        },
      ]);

      //Setting the state to show single file attributes
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  handleSend(newMessage = []) {
    const x = JSON.stringify(newMessage[0]);
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
    const id = uuidv4();
    const createdAt = new Date();
    this.setState({attendanceCardId: id, attendanceCardCreatedTime: createdAt});
    this.handleSend([
      {
        _id: id,
        createdAt: createdAt,
        customView: 'attendance',
        user: {_id: this.state.user, name: this.state.userName},
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
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({isModalVisible: false});
          }}>
          <Modal isVisible={this.state.isModalVisible}>
            <View
              style={{
                justifyContent: 'center',
                backgroundColor: 'transparent',
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  margin: 50,
                  maxHeight: 250,
                  padding: 40,
                  borderRadius: 20,
                  flex: 1,
                }}>
                <Pressable
                  style={styles.button}
                  onPress={() => {
                    this.createCard(), this.setState({isModalVisible: false});
                  }}>
                  <Text style={styles.text}>Start Attendance</Text>
                </Pressable>

                <View style={{marginTop: 20}}>
                  <Pressable
                    style={styles.button}
                    onPress={() => this.sendImage()}>
                    <Text style={styles.text}>Send Image</Text>
                  </Pressable>
                </View>

                <View style={{marginTop: 20}}>
                  <Pressable
                    style={styles.button}
                    onPress={() => this.sendVideo()}>
                    <Text style={styles.text}>Send Video</Text>
                  </Pressable>
                </View>

                <View style={{marginTop: 20}}>
                  <Pressable
                    style={styles.button}
                    onPress={() => this.setState({isModalVisible: false})}>
                    <Text style={styles.text}>CLOSE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>

        <GiftedChat
          renderInputToolbar={props =>
            this.props.route.params.group.createdByUser ===
              this.props.route.params.userId || this.state.groupType == 0 ? (
              <View style={{flexDirection: 'row', flex: 1}}>
                <View style={{flex: 1}}>
                  <InputToolbar {...props} />
                </View>
                <Icon
                  name="paperclip"
                  size={45}
                  color="#bf1313"
                  onPress={() => this.ModalTester()}
                />
              </View>
            ) : (
              <View />
            )
          }
          renderMessageVideo={props => this.renderMessageVideo(props)}
          messages={this.state.messages}
          onSend={newMessage => this.handleSend(newMessage)}
          user={{_id: this.state.user, name: this.state.userName}}
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
                  left: {
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
