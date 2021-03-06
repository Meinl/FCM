import React, { Component } from 'react';
import { View, Text, PermissionsAndroid, Platform, Dimensions, Image } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Cool Photo App Camera Permission',
        'message': 'Cool Photo App needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}

const screen = Dimensions.get('window');
//const selectedMarker = require('assets/pin.png');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class MapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      latitude: null,
      longitude: null,
      error: null,
      gpsPermission: false,
      degree: 90,
      speed: 0
    };
  }

  componentDidMount() {
    requestCameraPermission()
    navigator.geolocation.watchPosition(
      (position) => {
        console.log(position)
        const { coordinate } = this.state;
        const newCoordinate = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.setState({
          degree: position.coords.heading,
          speed: Math.round(position.coords.speed * 1.609344)
        })
        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1 },
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  animate = () => {
    const {coordinate} = this.state
    if (Platform.OS === 'android') {
      if (this.marker) {
        this.marker._component.animateMarkerToCoordinate(coordinate, 500);
      }
    } else {
      coordinate.timing(this.state.coordinate).start();
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          provider={this.props.provider}
          style={{flex: 1}}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker.Animated
            ref={marker => { this.marker = marker; }}
            coordinate={this.state.coordinate}
          />
        </MapView>
        <View style={{width:100, height:100, backgroundColor: 'white', position:'absolute', borderRadius:50, borderColor:'black', borderWidth: 4, justifyContent: 'center', alignItems: 'center'}}><Text style={{textAlign: 'center', fontSize: 22}}>{`${this.state.speed} km`}</Text></View>
      </View>
    );
  }
}

export default MapPage;