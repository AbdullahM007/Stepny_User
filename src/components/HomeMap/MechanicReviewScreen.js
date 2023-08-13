import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const MechanicReviewScreen = ({route}) => {
  const mechanicsDetails = route?.params?.mechaData;
  // console.log('MechanicalReviewScreen', mechanicsDetails);
  // Sample data for recent rides
  const [recentRides, setRecentRides] = useState([
    {
      id: '1',
      date: '2023-07-20',
      MechanicName: 'Abdullah',
      Service: 'Mechanic',
      fare: '1500 Rs',
    },
    {
      id: '2',
      date: '2023-07-18',
      MechanicName: 'Usama',
      Service: 'Electrician',
      fare: '1200 Rs',
    },
    {
      id: '3',
      date: '2023-07-16',
      MechanicName: 'Hamza',
      Service: 'Car Tower',
      fare: '2000 Rs',
    },
    // Add more recent rides data as needed
  ]);

  const bounceValue = useRef(new Animated.Value(-100)).current;

  // Reset the animation value and trigger bounce-in animation when the screen gains focus
  useFocusEffect(() => {
    startBounceInAnimation();
    return () => {
      // Cleanup function to reset animation value when the screen loses focus
      bounceValue.setValue(-100);
    };
  });

  const startBounceInAnimation = () => {
    // Start the bounce-in animation
    Animated.timing(bounceValue, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const renderRecentRideItem = ({item}) => {
    const animatedStyle = {
      transform: [{translateX: bounceValue}],
    };
    console.log(item);
    return (
      <TouchableOpacity onPress={startBounceInAnimation}>
        <Animated.View style={[styles.rideItemContainer, animatedStyle]}>
          <Text style={styles.dateText}>{item.date}</Text>
          {/* <Text
            style={styles.MechanicName}>{`Name: ${item.MechanicName}`}</Text> */}
          <Text
            style={styles.Service}>{`Service: ${item.service_details}`}</Text>
          <Text style={styles.fareText}>{`Paid: ${item.charges}`}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    // <ImageBackground source={require('../assets/Images/6.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
        Reviews
      </Text>
      <FlatList
        data={mechanicsDetails}
        renderItem={renderRecentRideItem}
        keyExtractor={item => item.id}
      />
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => setRecentRides([])}>
        <Text style={styles.buttonText}>Clear Recent Rides</Text>
      </TouchableOpacity> */}
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  rideItemContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  MechanicName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'red',
  },
  Service: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  fareText: {
    fontSize: 16,
    color: 'green',
  },
  button: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MechanicReviewScreen;