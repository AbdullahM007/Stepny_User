import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {useUpdateLocationMutation} from '../../ReduxTollKit/Stepney/stepneyUser';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {setLocation, setLocationaccess} from '../../ReduxTollKit/Slices/slice';
const GOOGLE_MAPS_APIKEY = 'AIzaSyBAo0ueJdL4wZYYrGFFBVbEuziCLDyQhN8';

const RouteMap = ({origin, destination}) => {
  const UserId = useSelector(state => state.useData.userId);
  const location = useSelector(state => state.useData.location);

  const dispatch = useDispatch();
  function getLocation() {
    Geolocation.getCurrentPosition(
      position => {
        // console.log('DATA', position);
        // dispatch(
        // setUserLocation({
        //   lat: position.coords.latitude,
        //   lon: position.coords.longitude,
        // }),
        dispatch(
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }),
        );
        // );
      },
      error => {
        // See error code charts below.

        console.error('dfdgdg', error.code, error.message);
        dispatch(setLocationaccess(false));
      },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
    );
  }

  const [myPosition, setMyPosition] = useState(null);
  const originLoc = {
    latitude: origin?.lat,
    longitude: origin?.lon,
  };
  const [updateLocation, {data, error, isLoading}] =
    useUpdateLocationMutation();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      // This code will run after 10 seconds
      getLocation();
      updateLocation({
        id: UserId,
        latitude: myPosition?.latitude,
        longitude: myPosition?.longitude,
      });
      console.log('Timer expired after 10 seconds');
      // You can add your navigation logic here
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clean up the timer when the component unmounts
  }, []);
  const destinationLoc = {
    latitude: destination?.latitude,
    longitude: destination?.longitude,
  };
  const onUserLocationChange = event => {
    setMyPosition(event.nativeEvent.coordinate);
  };
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      // showsUserLocation={true}
      // onUserLocationChange={onUserLocationChange}
      style={{width: '100%', height: '100%'}}
      region={{
        latitude: (location.lat + destination?.latitude) / 2,
        longitude: (location?.lon + destination?.longitude) / 2,
        latitudeDelta: Math.abs(location?.lat - destination?.latitude) * 1.5,
        longitudeDelta: Math.abs(location?.lon - destination?.longitude) * 1.5,
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
          latitude: location?.lat,
          longitude: location?.lon,
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
