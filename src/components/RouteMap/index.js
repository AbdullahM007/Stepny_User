import React from 'react'
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY='AIzaSyBAo0ueJdL4wZYYrGFFBVbEuziCLDyQhN8'

const RouteMap = ({origin,destination}) => {
  
  const originLoc = {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  };

  const destinationLoc = {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  };
  
  
  return (
    
   
      <MapView
       provider={PROVIDER_GOOGLE} 
       showsUserLocation={true} 
       style={{width:'100%',height:'100%'}}
       region={{
        latitude: (origin.details.geometry.location.lat + destination.details.geometry.location.lat) / 2,
        longitude: (origin.details.geometry.location.lng + destination.details.geometry.location.lng) / 2,
        latitudeDelta: Math.abs(origin.details.geometry.location.lat - destination.details.geometry.location.lat) * 1.5,
        longitudeDelta: Math.abs(origin.details.geometry.location.lng - destination.details.geometry.location.lng) * 1.5,
       }}
     >
      <MapViewDirections
    origin={originLoc}
    destination={destinationLoc}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={5}
    strokeColor="red"
  />
  <Marker
      coordinate={{
        latitude: origin.details.geometry.location.lat,
        longitude: origin.details.geometry.location.lng}}
      title={'Origin'}
    />
      <Marker
      coordinate={{
        latitude: destination.details.geometry.location.lat,
        longitude: destination.details.geometry.location.lng}}
      title={'Destination'}
    />

      
      
     </MapView>
      
      
  );
};

export default RouteMap;
