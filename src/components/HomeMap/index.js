import React from 'react'
import { View, Text,Image,item, FlatList } from 'react-native'
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import cars from '../../assets/data/cars';

export const HomeMap = (props) => {
  const getImage =(type)=>
  {
    if (type === 'Mechanic'){
    return require('../../assets/Images/Mechanic-car.png')

  }
  if (type === 'Electrician'){
    return require('../../assets/Images/electric-car.png')

  }

    return require('../../assets/Images/tow-truck.png')

  }
  return (
   
      <MapView
       provider={PROVIDER_GOOGLE} 
       showsUserLocation={true} 
       style={{width:'100%',height:'100%'}}     
       region={{
        // Current Display Setting on screen
        latitude: 32.239815,
    longitude: 74.142355,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
      {cars.map((car)=>(
      <Marker
      key={car.id}
  coordinate={{ latitude : car.latitude , longitude : car.longitude }}
  >
    
    <Image 
    style={{
      width: 50,
      height:50,
      // transform:[{
      //   rotate:`${car.heading}deg`
      // }]
    }} 
    resizeMode="center"
    source={getImage(car.type)}
    />
  
</Marker>))}
      
      
     </MapView>
      
      
  );
};

export default HomeMap;
