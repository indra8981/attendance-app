import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/login';
import GroupTabs from './components/groupTabs';
import GroupCreate from './components/groupCreate';
import chatScreen from './components/chatScreen';
import Modal from 'react-native-modal';
import { HeaderBackButton } from '@react-navigation/stack';
import axios from 'axios';
import AttendanceChart from './components/attendanceChart';
import Icon from 'react-native-vector-icons/FontAwesome';

axios.defaults.baseURL = 'http://localhost:8000';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      navigation: null,
    };
  }

  popUp (navigation){
    const f = !this.state.isModalVisible;
    this.setState({isModalVisible: f, navigation: navigation});
    
  }


  render() {
    const Stack = createStackNavigator();

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
                  maxHeight: 180,
             
                  flex: 1,
                  marginBottom: 450,
                  marginLeft: 180,
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.state.navigation.navigate("groupTabs"), this.setState({isModalVisible: false});
                  }}>
                  <Text style={styles.text}>STATS</Text>
                </TouchableOpacity>

                <View>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Decide - 1</Text>
                  </TouchableOpacity>
                </View>

                <View >
                  <TouchableOpacity
                    activeOpacity = {0.2}
                    style={styles.button}
                    onPress={() => this.setState({isModalVisible: false})}>
                    <Text style={styles.text}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>




        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="groupTabs" component={GroupTabs} />
            <Stack.Screen name="groupCreate" component={GroupCreate} />
            <Stack.Screen name="chatScreen" component={chatScreen} 

            options={({ navigation }) => ({
              headerRight: (props) => (
                <Icon
                  name="list"
                  size={30}
                  color="black"
                  onPress={() => this.popUp(navigation)}
                  style = {{marginRight: 17, marginTop: 4}}
                />
              ),
            })}
        
            />
          </Stack.Navigator>
        </NavigationContainer>

      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  
  button: {
    padding: 15,
    width: "100%",
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});

