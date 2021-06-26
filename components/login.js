import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from './axios';
import Geolocation from 'react-native-geolocation-service';

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
  
    

    Geolocation.getCurrentPosition(
      info => {
        const geolocationInstance = {
          userEmail: value.email,
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          timestamp: info.timestamp,
        };
        console.log("INFO -> ", info);
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
        enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
      },
    );




  }
  async componentDidMount() { 

    const email = this.props.route.params.email;
    const password = this.props.route.params.password;

    if(email && password){
      this.setState({email: email, password: password});
    }

    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      console.log("ENTERED -----------")
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


  async requestPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]).then((result) => {
        console.log(result);
        if (
          result['android.permission.ACCESS_COARSE_LOCATION'] &&
          result['android.permission.ACCESS_FINE_LOCATION'] === 'granted'
        ) {
          return true;
        }
        return false;
      });
    } catch (err) {
      console.warn(err);
      return false;
      }
    }



  async onLogin() {
    axios
      .post('/users/login', this.state)
      .then(async res => {
        console.log(res);
        if (res.status === 200) {
          await AsyncStorage.setItem('loggedIn', JSON.stringify(res.data));

          const permission = await this.requestPermission();

          if(permission){
                  Geolocation.getCurrentPosition(
                    info => {
                      const geolocationInstance = {
                        userEmail: res.data.email,
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                        timestamp: info.timestamp,
                      };
                      console.log("INFO -> ", info);
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
                      enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
                    },
                  );
        
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
                      enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
                    },
                  );
          }else{

            Geolocation.getCurrentPosition(
              info => {
                const geolocationInstance = {
                  userEmail: res.data.email,
                  latitude: info.coords.latitude,
                  longitude: info.coords.longitude,
                  timestamp: info.timestamp,
                };
                console.log("INFO -> ", info);
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
                enableHighAccuracy: false,
                distanceFilter: 4,
              },
            );
  
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
                enableHighAccuracy: false,
                distanceFilter: 4,
              },
            );

          }

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

        <Text
          style={{
            marginTop: 25,
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Don't have an account?{' '}
          <Text
            style = {{color : 'blue', textDecorationLine: 'underline'}}
            onPress={ () => this.props.navigation.navigate('signup') }
          >
          Sign Up
          </Text>
        </Text>

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
