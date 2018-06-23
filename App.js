import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Home } from './screens/Home'
import { MapPage } from './screens/MapPage'
import { CameraPage } from './screens/CameraPage'
//import { TabPage } from './screens/TabPage'

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
const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({
        header: null,
        title: 'Inicio'
      }),
    },
    MapPage: {
      screen: MapPage,
      navigationOptions: () => ({
        header: null,
        title: 'Ubicación',
        color: 'yellow'
      }),
    },
    CameraPage: {
      screen: CameraPage,
      navigationOptions: () => ({
        header: null,
        title: 'Cámara'
      }),
    },
  },
  {
    /* Other configuration remains unchanged */
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />
  }
}
