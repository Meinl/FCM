import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Home } from './screens/Home'
import { MapPage } from './screens/MapPage'

const RootStack = createStackNavigator(
  {
    Home: Home,
    MapPage: MapPage
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
