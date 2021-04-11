import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GroupListScreen from './groupList';
class GroupTabs extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const Tab = createMaterialTopTabNavigator();
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="groupList"
          children={() => <GroupListScreen type={'group'} />}
        />
        <Tab.Screen
          name="classList"
          children={() => <GroupListScreen type={'classroom'} />}
        />
      </Tab.Navigator>
    );
  }
}

export default GroupTabs;
