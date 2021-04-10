import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/login';
import GroupListScreen from './components/groupList';

class App extends React.Component {
  render() {
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="groupList" component={GroupListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
