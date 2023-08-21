import React, {useState} from 'react';
import {View, Text, Image, Pressable, Alert, TextInput} from 'react-native'; // Import TextInput
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import cars from '../../assets/data/cars';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

export const OrderScreen = () => {
  const navigation = useNavigation();
  const [reviewVisible, setReviewVisible] = useState(false); // State to manage review visibility
  const [rating, setRating] = useState(5); // State to store user's rating
  const [description, setDescription] = useState(''); // State to store user's description

  const orderFulfilled = () => {
    Alert.alert('', 'Are You Sure!! Your car is Fixed', [
      {
        text: 'Yes',
        onPress: () => setReviewVisible(true), // Show review input after confirming car is fixed
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  };
  const submitReview = () => {
    // Process the review and navigate back to Home screen
    navigation.navigate('Home');
  };
  const onCancel = async () => {
    Alert.alert('', 'Are You Sure you want to cancel Service', [
      {
        text: 'Yes',
        onPress: () => navigation.navigate('Home'),
      },
      {text: 'No', style: 'cancel'},
    ]);
  };
  const getImage = type => {
    if (type === 'Mechanic') {
      return require('../../assets/Images/Mechanic-car.png');
    }
    if (type === 'Electrician') {
      return require('../../assets/Images/electric-car.png');
    }

    return require('../../assets/Images/tow-truck.png');
  };
  return (
    <>
      {/* <View style={styles.container}>
        <Text style={styles.ordertext}>Your Mechanic is on the way</Text>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={{width: '100%', height: '100%'}}
        region={{
          // Current Display Setting on screen
          latitude: 32.239815,
          longitude: 74.142355,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {cars.map(car => (
          <Marker
            key={car.id}
            coordinate={{latitude: car.latitude, longitude: car.longitude}}>
            <Image
              style={{
                width: 50,
                height: 50,
                // transform:[{
                //   rotate:`${car.heading}deg`
                // }]
              }}
              resizeMode="center"
              source={getImage(car.type)}
            />
          </Marker>
        ))}
      </MapView>
      <View style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}>
        <Pressable
          onPress={orderFulfilled}
          style={{
            width: '100%',
            borderRadius: 10,
            backgroundColor: 'green',
            padding: 10,
            margin: 5,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Car is Fixed</Text>
        </Pressable>
        <Pressable
          onPress={onCancel}
          style={{
            borderRadius: 10,
            backgroundColor: 'red',
            padding: 10,
            margin: 20,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Cancel Service
          </Text>
        </Pressable>
      </View> */}
      {/* {reviewVisible && ( */}
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewHeading}>Please provide your review</Text>
          <TextInput
            style={styles.reviewTextInput}
            placeholder="Rating (1-5)"
            onChangeText={text => setRating(parseInt(text))}
            keyboardType="numeric"
            maxLength={1}
          />
          <TextInput
            style={styles.reviewTextInput}
            placeholder="Description"
            onChangeText={text => setDescription(text)}
          />
          <Pressable onPress={submitReview} style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Submit Review</Text>
          </Pressable>
        </View>
      {/* )} */}
    </>
  );
};

export default OrderScreen;
