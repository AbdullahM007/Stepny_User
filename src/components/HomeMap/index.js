import React, { useState } from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import MapView, {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import cars from '../../assets/data/cars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';




export const HomeMap = (props) => {

  
  const navigation = useNavigation();
  const handleHireButtonPress = () => {
    // Navigate to the desired screen here
    navigation.navigate('DestinationSearchScreen'); // Replace 'DestinationScreen' with the name of the screen you want to navigate to
  };
  
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
  const renderRatingStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - filledStars);
    const emptyStars = 5 - filledStars - halfStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<MaterialCommunityIcons key={i} name="star" size={20} color="gold" />);
    }

    if (halfStars > 0) {
      stars.push(<MaterialCommunityIcons key="half" name="star-half" size={20} color="gold" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<MaterialCommunityIcons key={`empty-${i}`} name="star-outline" size={20} color="gold" />);
    }

    return stars;
  };

  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        style={{ width: '100%', height: '100%' }}
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
            onPress={() => handleMarkerPress(car)} // Add onPress event
          >
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="center"
              source={getImage(car.type)}
            />
          </Marker>
        ))}
      </MapView>

      {/* Add the popup to display marker details */}
      {selectedMarker && (
        <View style={styles.markerPopup}>
          <View style={styles.profileHeader}>
            <Image
              source={selectedMarker.image}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, styles.selectedMarkerName]}>Name: Abdullah {selectedMarker.name}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>Rating:</Text>
                {renderRatingStars(selectedMarker.rating)}
              </View>
              <Text style={styles.ServiceType}>My Services: {selectedMarker.ServiceType}</Text>
            </View>
          </View>
          <Pressable style={styles.hireButton} onPress={handleHireButtonPress}>
            <Text style={styles.hireButtonText}>Hire?</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  markerPopup: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  ServiceType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  profileRating: {
    fontSize: 16,
    color: 'black',
  },
  hireButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor:'black'
  },
  hireButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeMap;