import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, Alert, ScrollView} from 'react-native';
import axios from './axios';0

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rollNumber: '',
      email: '',
      password: '',
      department: '',
      year: '',
    };
  }

onSignup() {
    axios
      .post('/users/signup', this.state)
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          this.props.navigation.navigate('login', {...this.state});
        }else{
            Alert.alert('Enter correct email and password');
            this.setState({email: '', password: '',})
        }
      })
      .catch(err => {
        Alert.alert('Enter correct email and password');
        console.log(err);
      });
  }

  render() {
    return (
      <View style={{justifyContent: 'center', flex: 1, margin: 12}}>
        <ScrollView>
        <Text
          style={{
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 30,
            marginBottom: 50,
          }}>
          Signup
        </Text>

        <TextInput
          style={styles.input}
          value={this.state.name}
          onChangeText={name => this.setState({name: name})}
          placeholder={'Enter your name'}
        />

        <TextInput
          style={styles.input}
          value={this.state.rollNumber}
          onChangeText={rollNumber => this.setState({rollNumber: rollNumber})}
          placeholder={'Enter your roll number'}
        />

        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({email: email})}
          placeholder={'Enter your email address'}
        />

        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={password => this.setState({password: password})}
          placeholder={'Enter your password'}
        />

        <TextInput
          style={styles.input}
          value={this.state.department}
          onChangeText={department => this.setState({department: department})}
          placeholder={'Enter your department'}
        />

        <TextInput
          style={styles.input}
          value={this.state.year}
          onChangeText={year => this.setState({year: year})}
          placeholder={'Enter your year'}
        />

        <Button title={'SignUp'} onPress={ () => this.onSignup() }/>

        <Text
          style={{
            marginTop: 25,
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 16,
          }}
          >
          Already have an account?{' '}
          <Text
            style = {{color : 'blue', textDecorationLine: 'underline'}}
            onPress={ () => this.props.navigation.navigate('login') }
          >
          Sign In
          </Text>
        </Text>
        </ScrollView>
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
export default SignUpScreen;
