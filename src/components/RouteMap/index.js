import React, {useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBAo0ueJdL4wZYYrGFFBVbEuziCLDyQhN8';

const RouteMap = ({origin, destination}) => {
  const originLoc = {
    latitude: origin?.lat,
    longitude: origin?.lon,
  };

  const destinationLoc = {
    latitude: destination?.latitude,
    longitude: destination?.longitude,
  };

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      // showsUserLocation={true}
      style={{width: '100%', height: '100%'}}
      region={{
        latitude: (origin?.lat + destination?.latitude) / 2,
        longitude: (origin?.lon + destination?.longitude) / 2,
        latitudeDelta: Math.abs(origin?.lat - destination?.latitude) * 1.5,
        longitudeDelta: Math.abs(origin?.lon - destination?.longitude) * 1.5,
      }}>
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="red"
        mode="DRIVING"
      />
      <Marker
        coordinate={{
          latitude: origin?.lat,
          longitude: origin?.lon,
        }}
        title={'Origin'}
      />
      <Marker
        coordinate={{
          latitude: destination?.latitude,
          longitude: destination?.longitude,
        }}
        title={'Destination'}
      />
    </MapView>
  );
};

export default RouteMap;
