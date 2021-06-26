import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/login';
import GroupTabs from './components/groupTabs';
import GroupCreate from './components/groupCreate';
import chatScreen from './components/chatScreen';

class App extends React.Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="groupTabs" component={GroupTabs} />
          <Stack.Screen name="groupCreate" component={GroupCreate} />
          <Stack.Screen name="chatScreen" component={chatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
