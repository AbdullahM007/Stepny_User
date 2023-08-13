import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import cars from '../../assets/data/cars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  useGetAllFeedBackQuery,
  useGetAllMechanicsQuery,
} from '../../ReduxTollKit/Stepney/stepneyUser';
export const HomeMap = props => {
  const {
    data: AllMechanics,
    error: mechanicError,
    isLoading: MechanicLoading,
  } = useGetAllMechanicsQuery(1);
  const [userId, setuserId] = useState();
  const {
    data: allFeedBack,
    error: feedBackError,
    isLoading: feedBackLoading,
  } = useGetAllFeedBackQuery({id: userId});
  // console.log('GET ALLMechanics', allFeedBack, feedBackError);

  const navigation = useNavigation();
  const handleHireButtonPress = () => {
    // Navigate to the desired screen here
    navigation.navigate('DestinationSearchScreen'); // Replace 'DestinationScreen' with the name of the screen you want to navigate to
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
  const renderRatingStars = rating => {
    const filledStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - filledStars);
    const emptyStars = 5 - filledStars - halfStars;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <MaterialCommunityIcons key={i} name="star" size={20} color="gold" />,
      );
    }

    if (halfStars > 0) {
      stars.push(
        <MaterialCommunityIcons
          key="half"
          name="star-half"
          size={20}
          color="gold"
        />,
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <MaterialCommunityIcons
          key={`empty-${i}`}
          name="star-outline"
          size={20}
          color="gold"
        />,
      );
    }

    return stars;
  };

  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleMarkerPress = marker => {
    console.log('MAIN SELECT', marker);
    setSelectedMarker(marker);
  };
  console.log('ID', userId);
  const handleNext = item => {
    setuserId(item);
    console.log('ITEMITEMITEMITEM', item);
  };
  React.useEffect(() => {
    if (allFeedBack) {
      navigation.navigate('MechanicReviewScreen', {mechaData: allFeedBack});
    }
  }, [allFeedBack]);
  console.log('allFeedBack', allFeedBack);
  return (
    <View>
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
        {AllMechanics?.map(item => (
          <Marker
            // key={car.id}
            coordinate={{latitude: item.latitude, longitude: item.longitude}}
            onPress={() => handleMarkerPress(item)} // Add onPress event
          >
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              resizeMode="center"
              source={require('../../assets/Images/electric-car.png')}
            />
          </Marker>
        ))}
      </MapView>

      {/* Add the popup to display marker details */}
      {selectedMarker && (
        <View style={styles.markerPopup}>
          <View style={styles.profileHeader}>
            {/* <Image source={selectedMarker.image} style={styles.profileImage} /> */}
            <FontAwesome name="user-circle" size={100} color="blue" />

            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, styles.selectedMarkerName]}>
                Name: {selectedMarker?.Name}
              </Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>
                  Rating:{selectedMarker?.rating}
                </Text>

                {/* {renderRatingStars(selectedMarker.rating)} */}
              </View>
              <Text style={styles.ServiceType}>
                My Services: {selectedMarker?.specialization}
              </Text>
              <Text style={styles.ServiceType}>
                Contact: {selectedMarker?.contact}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleNext(selectedMarker?.id)}>
                <Text
                  style={{
                    textAlign: 'center',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 10,
                    padding: 2,
                    marginBottom: 10,
                  }}>
                  <Ionicons name="information-circle" size={18} color="blue" />
                  Review
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('SearchResultScreen')}>
                <Text
                  style={{
                    backgroundColor:
                      selectedMarker?.status === true ? 'green' : 'yellow',
                    borderRadius: 10,
                    color: selectedMarker?.statue === true ? 'white' : 'black',
                    padding: 6,
                  }}>
                  {selectedMarker?.status === false
                    ? 'Unavailable'
                    : 'Available'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Pressable
            style={styles.hireButton}
            onPress={() =>
              navigation.navigate('SearchResultScreen', {
                lat: selectedMarker?.latitude,
                lon: selectedMarker?.longitude,
              })
            }>
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
    bottom: 92,
    left: 10,
    right: 10,
    backgroundColor: '#008080',
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
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  ServiceType: {
    fontSize: 14,
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
    backgroundColor: 'black',
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
