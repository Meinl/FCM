import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    View
  } from 'react-native';
import {
    createBottomTabNavigator,
    createStackNavigator,
  } from 'react-navigation';
    
  export class TabPage extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Bienvenido</Text>
        </View>
      );
    }
  }
  
  /*const HomeStack = createStackNavigator({
    Home: TabPage,
    Details: DetailsScreen,
  });
  
  const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Details: DetailsScreen,
  });
  */
  export default createBottomTabNavigator(
    {
      Home: Home,
      MapPage: MapPage,
      CameraPage: CameraPage
    },
    {
      /* Other configuration remains unchanged */
    }
  );