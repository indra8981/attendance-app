import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from './axios';
import Geolocation from '@react-native-community/geolocation';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  async updateLocation(value) {
    value = JSON.parse(value);
    Geolocation.watchPosition(
      info => {
        const geolocationInstance = {
          userEmail: value.email,
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          timestamp: info.timestamp,
        };
        axios
          .post('/users/updateLocation', geolocationInstance)
          .then(response => {});
      },
      err => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 4,
      },
    );
  }
  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const value = await AsyncStorage.getItem('loggedIn');
      if (value) {
        await this.updateLocation(value);
        this.props.navigation.navigate('groupTabs');
        return;
      }
    });
    const value = await AsyncStorage.getItem('loggedIn');
    if (value) {
      await this.updateLocation(value);
      this.props.navigation.navigate('groupTabs');
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  async onLogin() {
    axios
      .post('/users/login', this.state)
      .then(async res => {
        console.log(res);
        if (res.status === 200) {
          await AsyncStorage.setItem('loggedIn', JSON.stringify(res.data));
          Geolocation.watchPosition(
            info => {
              const geolocationInstance = {
                userEmail: res.data.email,
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                timestamp: info.timestamp,
              };
              axios
                .post('/users/updateLocation', geolocationInstance)
                .then(response => {
                  console.log('Hola', response);
                });
            },
            err => {
              console.log(err);
            },
            {
              enableHighAccuracy: true,
              distanceFilter: 4,
            },
          );
          this.props.navigation.navigate('groupTabs');
        }
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Please Enter correct email and password');
      });
  }
  render() {
    return (
      <View style={{justifyContent: 'center', flex: 1, margin: 12}}>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 50,
          }}>
          Login
        </Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({email: email})}
          placeholder={'Please enter your email address'}
        />

        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={password => this.setState({password: password})}
          placeholder={'Please enter your password'}
        />
        <Button title={'Login'} onPress={async () => await this.onLogin()} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});
export default LoginScreen;
