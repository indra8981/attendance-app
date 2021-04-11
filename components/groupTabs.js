import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GroupListScreen from './groupList';
import ClassListScreen from './classroomList';
class GroupTabs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Tab = createMaterialTopTabNavigator();
    return (
      <Tab.Navigator>
        <Tab.Screen name="groupList" component={GroupListScreen} />
        <Tab.Screen name="classList" component={ClassListScreen} />
      </Tab.Navigator>
    );
  }
}

export default GroupTabs;
