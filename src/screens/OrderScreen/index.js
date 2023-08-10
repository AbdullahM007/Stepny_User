import React from 'react'
import { View, Text,Image,Pressable,Alert } from 'react-native'
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import cars from '../../assets/data/cars';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';

export const OrderScreen = (props) => {
  const navigation= useNavigation();
  const orderFulfilled = () => {
    Alert.alert(
      "",
      "Are You Sure!! Your car is Fixed",
      [
        {
          text: "Yes",
          onPress: () => navigation.navigate("Home"),
        },
        {
          text: "No",
          style: "cancel", 
        },
      ]
    );
  };
  const onCancel = async () => {
    
    Alert.alert("",
     "Are You Sure you want to cancel Service",
     [{
      text:"Yes",
      onPress:() =>navigation.navigate('Home')
     },
     {text:"No",
     style:"cancel"}
    ])
  }
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
    
      <>
      <View style={styles.container}>
      <Text style={styles.ordertext} >
        Your Mechanic is on the way
        </Text>
        </View>
        
        <MapView
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      style={{ width: '100%', height: '50%' }}
      region={{
        // Current Display Setting on screen
        latitude: 32.239815,
        longitude: 74.142355,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      {cars.map((car) => (
        <Marker
          key={car.id}
          coordinate={{ latitude: car.latitude, longitude: car.longitude }}
        >

          <Image
            style={{
              width: 50,
              height: 50,
              // transform:[{
              //   rotate:`${car.heading}deg`
              // }]
            }}
            resizeMode="center"
            source={getImage(car.type)} />

        </Marker>))}


    </MapView>

    <Pressable onPress={orderFulfilled} style={{
    backgroundColor:'black',
        padding:20,
        margin:10,
        alignItems:'center',
       }}>
        <Text style={{color:'white',fontWeight:'bold'}}>Car is Fixed</Text>
    </Pressable>
    <Pressable onPress={onCancel} style={{
    backgroundColor:'red',
        padding:10,
        margin:20,
        alignItems:'center',
       }}>
        <Text style={{color:'white',fontWeight:'bold'}}>Cancel Service</Text>
    </Pressable>
    </>
      
      
  );
};

export default OrderScreen;
