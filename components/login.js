import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // axios.get("").then(res=>{
    //   this.setState({groups: res.data});
    // })
    console.log('login', global.ID);
  }
  render() {
    return (
      <View>
        <Text>Login Screen ta banate hbe bhulle hbe na</Text>
        <Button
          title="Cholo jai group list e"
          onPress={() => this.props.navigation.navigate('groupTabs')}
        />
      </View>
    );
  }
}

export default LoginScreen;
